import React from "react";
import AddressSelector from "./AddressSelector";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hệ thống chọn địa chỉ</h1>
      </header>
      <main className="app-main">
        <AddressSelector />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} - Hệ thống lựa chọn địa chỉ Việt Nam</p>
      </footer>
    </div>
  );
}

export default App;