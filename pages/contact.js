import React from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";

const Contact = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#FFFFFF", fontSize: "25px" }}
        >
          Contact Us
        </Typography>
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "#FFFFFF", fontSize: "25px" },
            label: { color: "#FFFFFF", fontSize: "25px" },
          }}
          InputLabelProps={{ style: { color: "#FFFFFF", fontSize: "25px" } }}
        />
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{
            input: { color: "#FFFFFF", fontSize: "25px" },
            label: { color: "#FFFFFF", fontSize: "25px" },
          }}
          InputLabelProps={{ style: { color: "#FFFFFF", fontSize: "25px" } }}
        />
        <Button className="button-submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
