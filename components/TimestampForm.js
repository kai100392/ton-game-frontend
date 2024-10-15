import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TimestampForm = ({ label, onSubmitValue, textColor }) => {
  const [dateTime, setDateTime] = useState(); // Holds selected date and time

  // Function to handle date and time change
  const handleDateTimeChange = (newValue) => {
    setDateTime(newValue);

    // Convert selected date and time to Unix timestamp
    const timestamp = newValue
      ? Math.floor(new Date(newValue).getTime() / 1000)
      : null;

    if (timestamp) {
      // Call the parent function to pass the value up
      onSubmitValue(timestamp);
      console.log("timestamp: ", timestamp);
    } else {
      console.log("Please select a date and time");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Ensure that the Box and DateTimePicker handle width correctly */}
      <Box sx={{ my: 2, width: "100%" }} display="flex" >
        <DateTimePicker
          sx={{
            width: "100%",
            "& .MuiInputLabel-root": {
              color: textColor, // Set label color from the prop
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: textColor, // Set border color from the prop
            },
            "& .MuiInputBase-input": {
              color: textColor, // Set input text color from the prop
            },
          }}
          label={label}
          value={dateTime} // your state value
          onChange={handleDateTimeChange} // Update function for dateTime
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TimestampForm;
