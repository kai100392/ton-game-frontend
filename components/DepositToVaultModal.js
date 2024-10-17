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

const colors = {
  primary: "#A45DBB",
  secondary: "#FF0000",
  background: "#151029",
  text: "#FFFFFF",
};

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

  const textFieldSx = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "& .MuiInputLabel-root": {
      color: colors.text,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "& .MuiInputBase-input": {
      color: colors.text,
      fontSize: '25px',
    },
  };


  return (
    <Modal
      sx={{ overflow: "auto" }}
      open={depositModalOpen}
      display="flex"
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        className="glowBox"
      >
        <div className="typography" variant="h4" component="h1" align="center">
          Deposit
          </div>

        {/* Form Fields */}
        <TextField
          fullwidth="true"
          label="DEPOSITOR ADDRESS"
          variant="outlined"
          margin="normal"
          value={depositorAddr}
          onChange={(e) => setDepositorAddr(e.target.value)}
          sx={textFieldSx}
        />
        <FormControl fullwidth="true" margin="normal" sx={textFieldSx}>
          <InputLabel id="currency-label">CURRENCY</InputLabel>
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
          fullwidth="true"
          label="AMOUNT"
          variant="outlined"
          margin="normal"
          value={depositAmnt}
          onChange={(e) => setDepositAmnt(e.target.value)}
          sx={textFieldSx}
        />

        {/* Add Outcome and Submit Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button className="button-add" variant="contained" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className="button-submit" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DepositToVaultModal;
