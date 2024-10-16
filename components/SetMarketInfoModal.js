import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import TimestampForm from "./TimestampForm";

const SetMarketInfoModal = ({
  setInfoModalOpen,
  handleSetInfoModalClose,
  handleSetMarketInfo,
  ticket,
}) => {
  // State to manage form input values
  const [category, setCategory] = useState("");
  const [descr, setDescr] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const formatInputForms = () => {
    setCategory("");
    setDescr("");
    setImgUrl("");
  };

  const handleModalClose = () => {
    handleSetInfoModalClose();
  };

  const handleDropdownChange = (event) => {
    setCategory(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prepare data as JSON
    const formData = {
      _anyTicket: ticket,
      _category: category,
      _descr: descr,
      _imgUrl: imgUrl,
    };

    await handleSetMarketInfo(formData);
    formatInputForms();
  };

  return (
    <Modal
      sx={{ overflow: "auto" }}
      open={setInfoModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
       className="glowBox"
      >
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Set Market Infomation
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="_anyTicket"
          variant="outlined"
          margin="normal"
          value={ticket}
          disabled
        />
       <FormControl
  fullWidth
  margin="normal"
  sx={{
    border: '1px solid white', // Adds a white border
    borderRadius: '4px', // Optional: Adds rounded corners
    '&:hover': {
      border: '1px solid white', // Keeps the border white on hover
    },
    '&.Mui-focused': {
      border: '1px solid white', // Keeps the border white when focused
    },
  }}
>
  <InputLabel id="category-label" sx={{ color: 'white' }}> {/* Optional: Change label color */}
    _category
  </InputLabel>
  <Select
    labelId="category-label"
    value={category}
    onChange={handleDropdownChange}
    label="_category"
    input={
      <OutlinedInput
        label="_category"
        sx={{
          borderColor: 'white', // Makes the input border white
          '&:hover': {
            borderColor: 'white', // Keeps the border white on hover
          },
          '&.Mui-focused': {
            borderColor: 'white', // Keeps the border white when focused
          },
        }}
      />
    }
  >
    <MenuItem value="Sports">Sports</MenuItem>
    <MenuItem value="Current Events">Current Events</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </Select>
</FormControl>

        <TextField
          fullWidth
          label="_descr"
          variant="outlined"
          margin="normal"
          value={descr}
          onChange={(e) => setDescr(e.target.value)} // Handle usdAmntLP input
        />
        <TextField
          fullWidth
          label="_imgUrl"
          variant="outlined"
          margin="normal"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)} // Handle usdAmntLP input
        />

        {/* Add Outcome and Submit Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="info" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className="button-submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SetMarketInfoModal;
