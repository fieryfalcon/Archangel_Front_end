import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Home";
import Loading from "./pages/Loading_page";
import Recruitment_seasons from "./pages/SeasonsList";
import Season from "./pages/Season.jsx"

import RecruitmentTest from './pages/Test';
import Sections from "./pages/Section.jsx";
import Questions from "./pages/Questions.jsx";


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/recruitment_seasons" element={<Recruitment_seasons />} />
        <Route exact path="/recruitment_seasons/season/:id" element={<Season />} />

        <Route exact path="/recruitment_seasons/recruitment_test/:id/" element={<RecruitmentTest />} />
        <Route exact path="/recruitment_seasons/recruitment_test/:id/questions/:roundid/" element={<Sections />} />
        <Route exact path="/recruitment_seasons/:id/:roundid/:sectionid/" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
