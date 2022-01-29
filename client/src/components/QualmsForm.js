import React, { useState, useEffect, useRef, memo } from "react";
import Axios from "axios";
import "react-dropdown/style.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReCAPTCHA from "react-google-recaptcha";

// Note for Jack: Shortcut for prettier is shift + option + f

const QualmTextBox = memo(({ onChange, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  };
  return (
    <TextField
        id="outlined-multiline-static"
        label="Qualm"
        multiline
        rows={4}
        value={value}
        onChange={handleChange}
        placeholder="Tell us your sudden sensation of misgiving or unease."
      />
  )
});

const VenuesBox = memo(({ onChange, options, value }) => {
  const handleChange = (e, newValue) => {
    onChange(newValue)
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value}
      onChange={handleChange}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          InputLabelProps={{ shrink: true }}
          {...params}
          label="Venue"
        />
      )}
    />
  );
});

const QualmsForm = () => {
  //use states
  const [venueTitle, setVenueTitle] = useState("");
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([
    "Loading...",
    "two",
    "three",
  ]); //default values
  const [qualmScore, setQualmScore] = useState(50);

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
      setVenueTitle(venueList[0]);
      setDropdownOptions(venueList);
    });
  }, []);

  const defaultOption = dropdownOptions[0];

  
  //Main gameplay loop baby!
  const submitQualm = async () => {
    ///create token and reset recaptcha

    // setFeedbackTxt(feedbackTxt);
    const reToken = await reRef.current.executeAsync();
    reRef.current.reset();

    await Axios.post("http://localhost:3001/api/sendqualm", {

      feedback: feedbackTxt,
      venue: venueTitle,
      score: qualmScore,
      token: reToken,
    }).then(() => {
      // Appears not to be working...
      console.log("Posted Qualm");
      alert("Successfully reported Qualm");
      // Future versions of this should redirect to a success page.
    });
  };

  return (
    <div autoComplete="off" className="form-control">
      {/*By default, the component disables the input autocomplete feature (remembering what the user has typed for a given field in a previous session) with the autoComplete="off" attribute. 
    Google Chrome does not currently support this attribute setting (Issue 587466). 
    A possible workaround is to remove the id to have the component generate a random one.
    */}
      <div className="venue-form">
        {/* <label>Venue:</label> */}
        <br></br>
        <VenuesBox onChange={setVenueTitle} options={dropdownOptions}
      value={venueTitle}/>
      </div>
      <br></br>
      {/* <label>Send us your qualms:</label> */}
      <QualmTextBox value={feedbackTxt} onChange={setFeedbackTxt}/>
      <Box width={300}>
        <Slider
          defaultValue={50}
          min={1}
          max={100}
          aria-label="Default"
          valueLabelDisplay="off"
          onChange={(e) => {
            setQualmScore(e.target.value);
          }}
        />
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
