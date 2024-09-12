import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const TimestampForm = ({ label, onSubmitValue }) => {
  const [dateTime, setDateTime] = useState(null); // Holds selected date and time

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
      <Box sx={{ my: 2, width: "100%" }} display="flex">
        <DateTimePicker
          sx={{ flexgrow: 1 }}
          label="_dtResultVoteEnd"
          value={dateTime} // your state value
          onChange={handleDateTimeChange} // Update function for dateTime
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TimestampForm;
