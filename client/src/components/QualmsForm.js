import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ReCAPTCHA from "react-google-recaptcha";

const QualmsForm = () => {
  //use states
  const [venueTitle, setVenueTitle] = useState("");
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([
    "one",
    "two",
    "three",
  ]); //default values

  //ref for captcha
  const reRef = useRef(null);

  //Dropdown selection
  const dropdownSelected = (selected) => {
    setVenueTitle(selected.value);
  };

  //Get request for venues on page load
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

  //Main gameplay loop baby!
  const submitQualm = async () => {
    ///create token and reset recaptcha
    const reToken = await reRef.current.executeAsync();
    reRef.current.reset();

    Axios.post("http://localhost:3001/api/sendqualm", {
      feedback: feedbackTxt,
      venue: venueTitle,
      token: reToken,
    }).then(() => {
      alert("successful post");
    });
  };

  return (
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
      <Box width={300}>
        <Slider defaultValue={4} min={1} max={100} aria-label="Default" valueLabelDisplay="off" />
      </Box>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn" onClick={submitQualm}>
          Submit
        </button>
      </div>
      <ReCAPTCHA
        sitekey="6Ld8izweAAAAAC_66W4pLRd11hfhg3tNKefI4vsd"
        size="invisible"
        ref={reRef}
      />
    </div>
  );
};

export default QualmsForm;
