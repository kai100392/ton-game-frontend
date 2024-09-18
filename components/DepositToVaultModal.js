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
import { TypeSpecimenOutlined } from "@mui/icons-material";

const DepositToVaultModal = ({
  depositModalOpen,
  handleDepositModalClose,
  handleDepositToVault,
  balance,
  account,
}) => {
  // State to manage form input values
  const [depositorAddr, setDepositorAddr] = useState(null);
  const [depositAmnt, setDepositAmnt] = useState(null);
  const [currencyType, setCurrencyType] = useState("PLS");

  const handleModalClose = () => {
    setDepositAmnt(null);
    handleDepositModalClose();
  };

  const handleDropdownChange = (event) => {
    setCurrencyType(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prepare data as JSON
    const formData = {
      _depositor: depositor,
      _depositAmnt: depositAmnt,
    };

    handleDepositToVault(formData);
    console.log(formData);
  };

  return (
    <Modal
      sx={{ overflow: "auto" }}
      open={depositModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Deposit
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="_depositorAddr"
          variant="outlined"
          margin="normal"
          value={depositorAddr}
          onChange={(e) => setDepositorAddr(e.target.value)} // Handle usdAmntLP input
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="currency-label">_currencyType</InputLabel>
          <Select
            labelId="currency-label"
            value={currencyType}
            onChange={handleDropdownChange}
            label="_currencyType"
            input={<OutlinedInput label="_currencyType" />}
          >
            <MenuItem value="Sports">PLS</MenuItem>
            <MenuItem value="Current Events">USD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="_depositAmnt"
          variant="outlined"
          margin="normal"
          value={depositAmnt}
          onChange={(e) => setDepositAmnt(e.target.value)} // Handle name input
        />

        {/* Add Outcome and Submit Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="info" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DepositToVaultModal;
