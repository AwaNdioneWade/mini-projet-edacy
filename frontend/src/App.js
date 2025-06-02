import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Produits from "./pages/Produits";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/produits" element={
          <PrivateRoute>
            <Produits />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
