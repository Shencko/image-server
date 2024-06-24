// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import SearchPage from "./components/SearchPage";
import DetailView from "./components/DetailView";

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Upload</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailView />} />
      </Routes>
    </div>
  </Router>
);

export default App;
