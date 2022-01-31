import React, { useState, useEffect, useRef, memo } from "react";
import Axios from "axios";
import "react-dropdown/style.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReCAPTCHA from "react-google-recaptcha";
import AlertDialogSlide from "./ALertDialogSlide";
import Button from "@mui/material/Button";

//regEx for form validation
const regexp = new RegExp(/^[a-zA-Z0-9.,:;()\r\n ]+$/);


//validation
function invalidateQualm(qualm, venue) {
  if (!regexp.test(qualm) || qualm.length === 0) {
    return true;
  } else {
    return false;
  } 
}

function invalidateVenue(venue) {
  if (!venue || venue.length === 0 ) {
    return true;
  } else {
    return false;
  }
}

const QualmTextBox = memo(({ onChange, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <TextField
      error={invalidateQualm(value) && value.length !== 0}
      helperText={
        invalidateQualm(value) && value.length !== 0 ? "Invalid input" : ""
      }
      label="Qualm"
      multiline
      rows={4}
      value={value}
      onChange={handleChange}
      sx={{ width: 300 }}
      placeholder="qualm / kwä(l)m; kwô(l)m/ • n. an uneasy feeling of doubt, worry, or fear, esp. about one's own conduct; a misgiving."
    />
  );
});

const VenuesBox = memo(({ onChange, options, value }) => {
  const handleChange = (e, newValue) => {
    onChange(newValue);
  };
  return (
    <Autocomplete
      disablePortal
      placeholder="Select Venue"
      options={options}
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
    "Loading..",
  ]); //default values
  const [qualmScore, setQualmScore] = useState(50);
  const [open, setOpen] = useState(false);

  //ref for captcha
  const reRef = useRef(null);

  //Get request for venues on page load
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/getvenues`
    ).then((response) => {
      console.log(response); //
      let venueList = [];
      for (let i = 0; i < response.data.length; i++) {
        venueList = [...venueList, response.data[i].venuename];
      }
      setDropdownOptions(venueList);
    });
  }, []);

  //Main gameplay loop baby!
  const submitQualm = async () => {
    ///create token and reset recaptcha
    if (invalidateQualm(feedbackTxt) || invalidateVenue(venueTitle)) {
      alert("Qualm not submitted, invalid characters");
      return;
    }

    // setFeedbackTxt(feedbackTxt);
    const reToken = await reRef.current.executeAsync();
    reRef.current.reset();

    //opens dialog success popup
    setOpen(true);

    //set feedbackText state to empty
    setFeedbackTxt("");

    await Axios.post(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/sendqualm`,
      {
        feedback: feedbackTxt,
        venue: venueTitle,
        score: qualmScore,
        token: reToken,
      }
    ).then(() => {
      console.log("Qualm Posted Successfully.");
      //add error catching here
    });
  };

  return (
    <div autoComplete="off" className="form-control">
      {/*By default, the component disables the input autocomplete feature (remembering what the user has typed for a given field in a previous session) with the autoComplete="off" attribute. 
    Google Chrome does not currently support this attribute setting (Issue 587466). 
    A possible workaround is to remove the id to have the component generate a random one.
    */}
      <div className="venue-form">
        <VenuesBox
          onChange={setVenueTitle}
          options={dropdownOptions}
          value={venueTitle}
        />
      </div>
      <br></br>
      <div>
        <QualmTextBox value={feedbackTxt} onChange={setFeedbackTxt} />
      </div>
      <br></br>
      <Box width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <SentimentVeryDissatisfiedIcon />
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
          <SentimentSatisfiedAltIcon />
        </Stack>
      </Box>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={submitQualm}>
          Submit
        </Button>
      </div>
      <ReCAPTCHA
        sitekey="6Ld8izweAAAAAC_66W4pLRd11hfhg3tNKefI4vsd"
        size="invisible"
        ref={reRef}
      />
      <AlertDialogSlide open={open} setOpen={setOpen} />
    </div>
  );
};

export default QualmsForm;
