import React from "react";
import { Button } from "@mui/material";

const TicketButton = ({
  color,
  label,
  ticketAddr,
  handleBuyTicketModalOpen,
  transferTicketAddr,
}) => {
  const handleClick = () => {
    transferTicketAddr(ticketAddr);
    handleBuyTicketModalOpen();
  };
  return (
    <>
      <Button
        variant="contained"
        color={color}
        sx={{ marginRight: 1, textTransform: "none" }}
        onClick={handleClick}
      >
        {label}
      </Button>
    </>
  );
};

export default TicketButton;
