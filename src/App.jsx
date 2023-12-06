import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList.jsx";
import UserDetails from "./pages/UserDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<UserList/>} />
        <Route path={"/user/:id"} element={<UserDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
