import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerList from "./component/CustomerList";
import EditPage from "./page/EditPage";

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/new" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;

