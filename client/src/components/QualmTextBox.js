import { memo } from "react";
import TextField from "@mui/material/TextField";

const QualmTextBox = memo(({ onChange, value, invalidateQualm }) => {
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

export default QualmTextBox