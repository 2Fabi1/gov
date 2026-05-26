import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>IMIONA POLSKICH DZIECI 2000-2026</h1>
        <p>Wybierz kategorie</p>
      </header>
      <nav style={styles.nav}>
        <div style={styles.card}>
          <h2>Damskie</h2>
          <ul>
            <li>
              <Link to="/damskie/imiona" style={styles.link}>Imiona</Link>
            </li>
            <li>
              <Link to="/damskie/nazwiska" style={styles.link}>Nazwiska</Link>
            </li>
          </ul>
        </div>
        <div style={styles.card}>
          <h2>Męskie</h2>
          <ul>
            <li>
              <Link to="/meskie/imiona" style={styles.link}>Imiona</Link>
            </li>
            <li>
              <Link to="/meskie/nazwiska" style={styles.link}>Nazwiska</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "40px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "200px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
  },
};

export default HomePage;
