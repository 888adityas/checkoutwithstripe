import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import CancelPage from "./pages/CancelPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/ordercancelled" element={<CancelPage />} />
            <Route path="/ordersuccessfull" element={<SuccessPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
