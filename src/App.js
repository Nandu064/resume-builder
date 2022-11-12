import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
} from "reactstrap";
import PersonalDetails from "./Components/Forms/PersonalDetails";
import EducationDetails from "./Components/Forms/EducationDetails";
import Experience from "./Components/Forms/Experience";
import Skills from "./Components/Forms/Skills";
import Languages from "./Components/Forms/Languages";
import Miscleanous from "./Components/Forms/Miscleanous";
import { Routes, Route, Link } from "react-router-dom";
import JobListing from "./Components/JobListing";
import HomePage from "./Components/Forms/HomePage";
import Template1 from "./Components/Templates/Template1";

function App() {
  return (
    <Container className="mt-5">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-resume" element={<Template1 />} />
        <Route path="/view-jobs" element={<JobListing />} />
      </Routes>
    </Container>
  );
}

export default App;
