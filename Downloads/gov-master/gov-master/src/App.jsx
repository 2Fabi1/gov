import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function App({ ids, sexLetter, type }) {
  const [rows, setRows] = useState([]);
  const [filtr, setFiltr] = useState("");
  const [wystReverse, setWystReverse] = useState(false);
  const [occurReverse, setOccurReverse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/aggregate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ids,
            type,
            sexLetter
          })
        });

        const json = await res.json();
        setRows(json.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [ids, sexLetter, type]);

  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function sortByOccurences() {
    const sorted = [...rows].sort((a, b) =>
      occurReverse ? a[1] - b[1] : b[1] - a[1]
    );

    setRows(sorted);
    setOccurReverse(prev => !prev);
    setWystReverse(false);
  }

  function sortByName() {
    const sorted = [...rows].sort((a, b) => {
      const aValue = normalize(a[0]);
      const bValue = normalize(b[0]);

      return wystReverse
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });

    setRows(sorted);
    setWystReverse(prev => !prev);
    setOccurReverse(false);
  }

  return (
    <>
      <SearchBar filtr={filtr} setFiltr={setFiltr} />

      <table className="table table-striped">
        {rows.length !== 0 && (
          <thead className="table-primary">
            <tr>
              <th onClick={sortByName}>Imie</th>
              <th onClick={sortByOccurences}>Wystapienia</th>
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map((row, i) =>
            filtr === "" ||
            row[0].toLowerCase().startsWith(filtr.toLowerCase()) ? (
              <tr key={i}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;