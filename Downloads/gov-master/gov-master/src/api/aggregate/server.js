import axios from "axios";

const BASE = "https://api.dane.gov.pl/1.4/resources";

const SCHEMAS = {
  imie: (row) => {
    const name = row.attributes?.col1?.val;
    const value = row.attributes?.col3?.val;
    return { name, value };
  },

  nazwisko: (row) => {
    const name = row.attributes?.col1?.val;
    const value = row.attributes?.col2?.val;
    return { name, value };
  },

  "21458": (row, sexLetter) => {
    if (row.attributes?.col4?.val !== sexLetter) return null;

    const name = row.attributes?.col2?.val;
    const value = row.attributes?.col3?.val;

    return { name, value };
  }
};

async function fetchAll(resourceId) {
  let url = `${BASE}/${resourceId}/data?per_page=50&page=1`;
  const all = [];

  while (url) {
    const res = await axios.get(url);
    const json = res.data;

    if (!json.data?.length) break;

    all.push(...json.data);
    url = json.links?.next || null;
  }

  return all;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { ids = [], type, sexLetter } = req.body || {};

    if (!ids.length) {
      return res.status(400).json({ error: "Missing ids" });
    }

    const datasets = await Promise.all(ids.map(fetchAll));
    const map = new Map();

    for (let i = 0; i < datasets.length; i++) {
      const id = String(ids[i]);
      const data = datasets[i];

      const parser = SCHEMAS[id] || SCHEMAS[type];

      if (!parser) continue;

      for (const row of data) {
        const parsed = parser(row, sexLetter);
        if (!parsed) continue;

        const { name, value } = parsed;
        if (!name) continue;

        map.set(name, (map.get(name) || 0) + (value || 0));
      }
    }

    const result = [...map.entries()].sort((a, b) => b[1] - a[1]);

    return res.status(200).json({ data: result });

  } catch (e) {
    console.error("API ERROR:", e);
    return res.status(500).json({
      error: "Internal Server Error",
      details: e.message
    });
  }
}