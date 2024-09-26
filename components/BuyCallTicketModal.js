import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Checkbox,
  FormGroup,
  FormControlLabel,
  OutlinedInput,
} from "@mui/material";
import { TypeSpecimenOutlined } from "@mui/icons-material";

const BuyCallTicketModal = ({
  buyTicketModalOpen,
  handleBuyTicketModalClose,
  handleBuyTicketWithPromoCode,
  ticketAddr,
}) => {
  // State to manage form input values
  const [promoCodeHash, setPromoCodeHash] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [withPromoCode, setWithPromoCode] = useState(false); //Checkbox for promo code
  const [usdAmnt, setUsdAmnt] = useState(null);

  const handleModalClose = () => {
    setDepositAmnt(null);
    handleBuyTicketModalClose();
  };

  const handlePromoCodeCheck = () => {
    if (withPromoCode) {
      setPromoCodeHash("0x0000000000000000000000000000000000000000");
      setWithPromoCode(false);
    } else {
      setPromoCodeHash("");
      setWithPromoCode(true);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prepare data as JSON
    const formData = {
      _ticket: ticketAddr,
      _promoCodeHash: promoCodeHash,
      _usdAmnt: usdAmnt,
    };

    handleBuyTicketWithPromoCode(formData);
    console.log(formData);
  };

  return (
    <Modal
      sx={{ overflow: "auto" }}
      open={buyTicketModalOpen}
      onClose={handleBuyTicketModalClose}
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
          Buy CallTicket{withPromoCode ? ` with Promo Code` : null}
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="_ticket"
          variant="outlined"
          margin="normal"
          value={ticketAddr}
          disabled
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={withPromoCode}
                onChange={handlePromoCodeCheck}
                size="small"
              />
            }
            label={`WithPromoCode`}
          />
        </FormGroup>

        {withPromoCode ? (
          <TextField
            fullWidth
            label="_promoCodeHash"
            variant="outlined"
            margin="normal"
            value={promoCodeHash}
            onChange={(e) => setPromoCodeHash(e.target.value)} // Handle name input
          />
        ) : null}

        <TextField
          fullWidth
          label="_usdAmnt"
          variant="outlined"
          margin="normal"
          type="number"
          value={usdAmnt}
          onChange={(e) => setUsdAmnt(e.target.value)} // Handle name input
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

export default BuyCallTicketModal;
