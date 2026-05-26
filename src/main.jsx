import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Homepage from "./Homepage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/damskie">
          <Route path="imiona" element={<App ids={[1159538, 63899, 54100, 44824, 36394, 28021, 21455]} sexLetter="K" type="imie"/>}/>
          <Route path="nazwiska" element={<App ids={[1148811]} sexLetter="K" type="nazwisko"/>}/>
      </Route> 
      <Route path="/meskie">
          <Route path="imiona" element={<App ids={[1159536, 63900, 54099, 44825, 36398, 28020, 21454]} sexLetter="M" type="imie"/>}/>
          <Route path="nazwiska" element={<App ids={[1148808]} sexLetter="M" type="nazwisko"/>}/>
      </Route> 
    </Routes>
  </BrowserRouter>,
);
