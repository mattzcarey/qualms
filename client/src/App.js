//Qualms FRONTEND

//Imports
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "./components/Header";
//import AddVenue from "./components/AddVenue";

function App() {
  //State things
  const [venueTitle, setVenueTitle] = useState("");
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([
    "one",
    "two",
    "three",
  ]); //default values

  //Main gameplay loop baby!
  const submitQualm = () => {
    Axios.post("http://localhost:3001/api/sendqualm", {
      feedback: feedbackTxt,
      venue: venueTitle,
    }).then(() => {
      alert("successful post");
    });
  };

  //Dropdown selection happened
  const dropdownSelected = (selected) => {
    //console.log(selected.value);
    setVenueTitle(selected.value);
  };

  //This should happen on page load...
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getvenues").then((response) => {
      console.log(response); //
      let venueList = [];
      for (let i = 0; i < response.data.length; i++) {
        venueList = [...venueList, response.data[i].venuename];
      }
      setDropdownOptions(venueList);
    });
  }, []);

  const defaultOption = dropdownOptions[0];

  return (
    <div className="container">
      <Header />
      <br></br>
      <div autoComplete="off" className="form-control">
        <div className="venue-form">
          <label>Venue:</label>
          <br></br>
          <Dropdown
            options={dropdownOptions}
            onChange={dropdownSelected}
            value={defaultOption}
            placeholder="Select an option"
          />
        </div>
        <br></br>
        <label>Send us your qualms:</label>
        <input
          type="text"
          name="feedbackTxt"
          className="form-control"
          required
          placeholder="Tell us your sudden sensation of misgiving or unease."
          onChange={(e) => {
            setFeedbackTxt(e.target.value);
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn" onClick={submitQualm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
