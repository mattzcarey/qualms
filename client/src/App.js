//Qualms FRONTEND

//Imports
import React from "react";
import "./App.css";
import "react-dropdown/style.css";
import Header from "./components/Header";
import QualmsForm from "./components/QualmsForm";
import { Link } from 'react-router-dom';
import Footer from "./components/Footer";

//import AddVenue from "./components/AddVenue";

// function App() {
const App = () => {

  return (
    <div className="container">
      <Header />
      <br></br>
      <QualmsForm />
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
