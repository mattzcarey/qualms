import { memo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const VenuesBox = memo(({ onChange, options }) => {
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

export default VenuesBox