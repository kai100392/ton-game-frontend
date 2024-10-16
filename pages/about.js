import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterbottom="true">
          About Us
        </Typography>
        <Typography variant="body1">
          This decentralized prediction market allows users to vote and earn
          based on predictions.
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} href="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default About;
