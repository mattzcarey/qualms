import React, { useState, useEffect, useRef, memo } from "react";
import { Axios } from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// FUTURE PROBLEM - this would be a really useful comnponent

//Example - need to return value
// StepOne = React.createClass({
//   getData: function() {
//     return this.state;
// }
// });

// StepTwo = React.createClass({
// getData: function() {
//     return this.state;
// }
// });

// EventCreation = React.createClass({
// submit: function() {
//     var data = Object.assign(
//         {},
//         this._stepOne.getData(),
//         this._stepTwo.getData()
//     );

//     // ... do AJAX
// },

// render: function() {
//     return (
//         <StepOne ref={(ref) => this._stepOne = ref} />
//         <StepTwo ref={(ref) => this._stepTwo = ref} />
//     );
// }
// });



const VenuesBox = memo(({ onChange, options, value }) => {
  //state

  const [dropdownOptions, setDropdownOptions] = useState(["Loading.."]); 

  //on load
  useEffect(() => {
    Axios.get(`https://qualms.uk/api/getvenues`).then((response) => {
      console.log(response); //
      let venueList = [];
      for (let i = 0; i < response.data.length; i++) {
        venueList = [...venueList, response.data[i].venuename];
      }

      setDropdownOptions(venueList);
    });
  }, []);

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


export default VenuesBox;