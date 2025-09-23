// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerList from "./component/CustomerList";
import EditPage from "./page/EditPage";
import LoginPage from "./page/LoginPage";
import PrivateRoute from "./component/PrivateRoute";

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={ <CustomerList />} />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <EditPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
