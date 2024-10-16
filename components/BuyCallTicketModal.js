import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

const BuyCallTicketModal = ({
  buyTicketModalOpen,
  handleBuyTicketModalClose,
  handleBuyTicketWithPromoCode,
  ticketAddr,
}) => {
  // State to manage form input values
  const [promoCodeHash, setPromoCodeHash] = useState("");
  const [usdAmnt, setUsdAmnt] = useState(null);

  const handleModalClose = () => {
    setUsdAmnt(null);
    handleBuyTicketModalClose();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
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
       className="glowBox"
      >
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Buy CallTicket with Promo Code
        </Typography>

        {/* Form Fields */}
        <TextField
          fullwidth={true}
          label="_ticket"
          variant="outlined"
          margin="normal"
          value={ticketAddr}
          disabled
        />

        <TextField
          fullwidth={true}
          label="_promoCodeHash"
          variant="outlined"
          margin="normal"
          value={promoCodeHash}
          onChange={(e) => setPromoCodeHash(e.target.value)}
        />

        <TextField
          fullwidth={true}
          label="_usdAmnt"
          variant="outlined"
          margin="normal"
          type="number"
          value={usdAmnt}
          onChange={(e) => setUsdAmnt(e.target.value)}
        />

        {/* Buttons */}
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

export default BuyCallTicketModal;
