//Qualms FRONTEND

//Imports
import React from "react";
import "./App.css";
import "react-dropdown/style.css";
import Header from "./components/Header";
import QualmsForm from "./components/QualmsForm";
//import AddVenue from "./components/AddVenue";

// function App() {
const App = () => {

  return (
    <div className="container">
      <Header />
      <br></br>
      <QualmsForm />
    </div>
  );
}

export default App;
