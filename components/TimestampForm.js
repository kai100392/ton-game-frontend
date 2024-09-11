import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const TimestampForm = ({ label }) => {
  const [dateTime, setDateTime] = useState(null); // Holds selected date and time

  // Function to handle form submission
  const handleSubmit = (value) => {
    setDateTime(value);
    // Convert selected date and time to Unix timestamp
    const timestamp = dateTime
      ? Math.floor(new Date(dateTime).getTime() / 1000)
      : null;

    if (timestamp) {
      console.log("Timestamp:", timestamp);
      // Here, you can submit the timestamp to your smart contract
    } else {
      console.log("Please select a date and time");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* DateTimePicker for selecting date and time */}
      <Box sx={{ m: 4 }}>
        <DateTimePicker
          fullWidth
          margin="normal"
          variant="outlined"
          label={label}
          value={dateTime}
          onChange={(newValue) => handleSubmit(newValue)} // Updates the callDeadline state
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TimestampForm;
