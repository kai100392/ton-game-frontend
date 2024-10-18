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
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.9)", // Optional background color
          padding: "2rem",
          borderRadius: "8px",
          color: "white", // Ensures all text inside is white
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          mb={2}
          sx={{ color: "white" }} // White font for modal title
        >
          Buy CallTicket with Promo Code
        </Typography>

        {/* Form Fields */}
        <TextField
          fullwidth="true"
          label="_ticket"
          variant="outlined"
          margin="normal"
          value={ticketAddr}
          disabled
          sx={{ input: { color: "white" }, label: { color: "white" } }} // White font for TextField
        />

        <TextField
          fullwidth="true"
          label="_promoCodeHash"
          variant="outlined"
          margin="normal"
          value={promoCodeHash}
          onChange={(e) => setPromoCodeHash(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "white" } }} // White font for TextField
        />

        <TextField
          fullwidth="true"
          label="_usdAmnt"
          variant="outlined"
          margin="normal"
          type="number"
          value={usdAmnt}
          onChange={(e) => setUsdAmnt(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "white" } }} // White font for TextField
        />

        {/* Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            className="button-card button-orange"
            variant="contained"
            onClick={handleModalClose}
            sx={{ color: "white" }} // White font for button text
          >
            Cancel
          </Button>
          <Button
            className="button-submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ color: "white" }} // White font for button text
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BuyCallTicketModal;
