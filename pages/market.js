import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const Market = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Prediction Market
        </Typography>
        <Typography variant="body1">
          Place your predictions on the upcoming events and earn rewards based
          on the outcomes.
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} href="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Market;
