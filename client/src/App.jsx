// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route
              path="/restaurants/:id"
              element={<RestaurantDetailPage />}
              exact
            />
            <Route
              path="/restaurants/:id/update"
              element={<UpdatePage />}
              exact
            />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
