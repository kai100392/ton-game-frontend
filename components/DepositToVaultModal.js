import React, { useState } from "react";
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
    const formData = {
      _depositor: depositorAddr,
      _depositAmnt: depositAmnt,
      _currencyType: currencyType,
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
        className="glowBox"
      >
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Deposit
        </Typography>

        {/* Form Fields */}
        <TextField
          fullwidth={true}
          label="_depositorAddr"
          variant="outlined"
          margin="normal"
          value={depositorAddr}
          onChange={(e) => setDepositorAddr(e.target.value)}
        />
        <FormControl fullwidth={true} margin="normal">
          <InputLabel id="currency-label">_currencyType</InputLabel>
          <Select
            labelId="currency-label"
            value={currencyType}
            onChange={handleDropdownChange}
            label="_currencyType"
            input={<OutlinedInput label="_currencyType" />}
          >
            <MenuItem value="PLS">PLS</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullwidth={true}
          label="_depositAmnt"
          variant="outlined"
          margin="normal"
          value={depositAmnt}
          onChange={(e) => setDepositAmnt(e.target.value)}
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

export default DepositToVaultModal;
