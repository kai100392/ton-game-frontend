import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import TimestampForm from "./TimeStampForm";

const CreateMarketModal = ({ createModalopen, handleCreateModalClose }) => {
  // State to manage form input values
  const [name, setName] = useState("");
  const [usdAmntLP, setUsdAmntLP] = useState("");
  const [dtCallDeadline, setDtCallDeadline] = useState(null);
  const [dtResultVoteStart, setDtResultVoteStart] = useState(null);
  const [dtResultVoteEnd, setDtResultVoteEnd] = useState(null);
  const [resultLabels, setResultLabels] = useState("");
  const [resultDescrs, setResultDescrs] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prepare data as JSON
    const formData = {
      _name: name,
      _usdAmntLP: usdAmntLP,
      _dtCallDeadline: dtCallDeadline,
      _dtResultVoteStart: dtResultVoteStart,
      _dtResultVoteEnd: dtResultVoteEnd,
      _resultLabels: resultLabels.split(","), // Assuming user enters comma-separated values
      _resultDescrs: resultDescrs.split(","),
    };

    try {
      console.log(formData);
      // Submit the data to your backend using fetch or axios
      const response = await fetch("/api/create-market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Market created:", data);

      // Handle success or error accordingly
      // Close the modal
      handleCreateModalClose();
    } catch (error) {
      console.error("Error creating market:", error);
    }
  };

  return (
    <Modal
      open={createModalopen}
      onClose={handleCreateModalClose}
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
          Create New Market
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="_name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)} // Handle name input
        />
        <TextField
          fullWidth
          label="_usdAmntLP"
          variant="outlined"
          margin="normal"
          value={usdAmntLP}
          type="number"
          onChange={(e) => setUsdAmntLP(e.target.value)} // Handle usdAmntLP input
        />
        <TimestampForm
          label="_dtCallDeadline"
          onSubmitValue={setDtCallDeadline}
        />
        <TimestampForm
          label="_dtResultVoteStart"
          onSubmitValue={setDtResultVoteStart}
        />
        <TimestampForm
          label="_dtResultVoteEnd"
          onSubmitValue={setDtResultVoteEnd}
        />
        <TextField
          fullWidth
          label="_resultLabels"
          variant="outlined"
          margin="normal"
          value={resultLabels}
          onChange={(e) => setResultLabels(e.target.value)} // Handle resultLabels input
          placeholder="yes, no, other"
        />
        <TextField
          fullWidth
          label="_resultDescrs"
          variant="outlined"
          margin="normal"
          value={resultDescrs}
          onChange={(e) => setResultDescrs(e.target.value)} // Handle resultDescrs input
          placeholder="yes means A win, no means B win, ..."
        />

        {/* Submit and Cancel Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCreateModalClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateMarketModal;
