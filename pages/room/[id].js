import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Card,
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import Image from "next/image";

import { currentVersion } from "..";

const colors = {
  primary: "#A45DBB",
  secondary: "#FF0000",
  background: "#151029",
  text: "#FFFFFF",
};

const RoomPage = () => {
  const router = useRouter();
  const { id, account } = router.query;

  return (
    <>
      {/* Top Navigation */}
      <div className="navbar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
            component="a" // This tells the Toolbar to behave like an anchor
            href="/"
          >
            <Image
              src="/ton.png"
              alt="TON-Game Logo"
              width={70}
              height={70}
              onClick={() => router.push("/")}
            />
            {`v${currentVersion}`}
          </Typography>

          <Button variant="outlined" color="info">
            balance :
          </Button>
        </Toolbar>
      </div>
      <Container maxWidth={false} sx={{ marginTop: 4 }}>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Left Section */}
          <div className="grid-container">
            <Card
              sx={{
                padding: {
                  xs: "5px", // For extra small devices (mobile phones)
                  sm: "10px", // For small devices (tablets)
                  md: "15px", // For medium devices (desktops)
                },
                borderRadius: 2,
                boxShadow: 3,
                marginTop: {
                  xs: "5px", // Margin for small screens
                  sm: "15px", // Center margin for medium and larger screens
                  md: "15px", // For desktops
                },
                width: {
                  xs: "100%", // Make the width responsive for mobile devices
                  sm: "100%", // For tablets
                  md: "100%", // For desktops
                },
                color: "white",
                background: ` radial-gradient(circle at 100% 100%, #1a1a1a 0, #1a1a1a 5px, transparent 5px) 0% 0%/8px 8px no-repeat,
  radial-gradient(circle at 0 100%, #1a1a1a 0, #1a1a1a 5px, transparent 5px) 100% 0%/8px 8px no-repeat,
  radial-gradient(circle at 100% 0, #0d0d0d 0, #0d0d0d 5px, transparent 5px) 0% 100%/8px 8px no-repeat,
  radial-gradient(circle at 0 0, #0d0d0d 0, #0d0d0d 5px, transparent 5px) 100% 100%/8px 8px no-repeat,
  linear-gradient(#1a1a1a, #0d0d0d) 50% 50%/calc(100% - 6px) calc(100% - 16px) no-repeat,
  linear-gradient(#1a1a1a, #0d0d0d) 50% 50%/calc(100% - 16px) calc(100% - 6px) no-repeat,
   rgb(230, 1, 1)`,
                boxShadow: `inset 0 0 15px rgba(164, 93, 187, 0.8), 
                0 0 20px 10px rgba(164, 93, 187, 0.3)`,
                transition: "border 0.2s ease-in-out",
                "&:hover": {
                  border: "1px solid darkblue",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                sx={{
                  flexDirection: { xs: "column", sm: "row" }, // Stack vertically on smaller screens
                }}
              >
                <Avatar
                  alt="logo"
                  src="/ton-logo.png"
                  sx={{
                    width: { xs: 50, sm: 80 }, // Smaller width for mobile, larger for desktop
                    height: { xs: 50, sm: 80 },
                    marginRight: { xs: 0, sm: 2 }, // No margin on mobile
                    mb: { xs: 1, sm: 0 }, // Add margin bottom on mobile for stacking
                  }}
                />
              </Box>

              <Box mb={2}>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.text,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Smaller font size for captions
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  OUTCOME
                </Typography>
              </Box>
            </Card>

            {/* Right Section */}

            <Card
              sx={{
                padding: {
                  xs: "5px", // For extra small devices (mobile phones)
                  sm: "10px", // For small devices (tablets)
                  md: "15px", // For medium devices (desktops)
                },
                borderRadius: 2,
                boxShadow: 3,
                marginTop: {
                  xs: "5px", // Margin for small screens
                  sm: "15px", // Center margin for medium and larger screens
                  md: "15px",
                },
                width: {
                  xs: "100%", // Make the width responsive for mobile devices
                  sm: "40%", // For tablets
                  md: "40%", // For desktops
                },
                color: "white",
                background: ` radial-gradient(circle at 100% 100%, #1a1a1a 0, #1a1a1a 5px, transparent 5px) 0% 0%/8px 8px no-repeat,
  radial-gradient(circle at 0 100%, #1a1a1a 0, #1a1a1a 5px, transparent 5px) 100% 0%/8px 8px no-repeat,
  radial-gradient(circle at 100% 0, #0d0d0d 0, #0d0d0d 5px, transparent 5px) 0% 100%/8px 8px no-repeat,
  radial-gradient(circle at 0 0, #0d0d0d 0, #0d0d0d 5px, transparent 5px) 100% 100%/8px 8px no-repeat,
  linear-gradient(#1a1a1a, #0d0d0d) 50% 50%/calc(100% - 6px) calc(100% - 16px) no-repeat,
  linear-gradient(#1a1a1a, #0d0d0d) 50% 50%/calc(100% - 16px) calc(100% - 6px) no-repeat,
   rgb(230, 1, 1)`,
                boxShadow: `inset 0 0 15px rgba(164, 93, 187, 0.8), 
                0 0 20px 10px rgba(164, 93, 187, 0.3)`,
                transition: "border 0.2s ease-in-out",
                "&:hover": {
                  border: "1px solid darkblue",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Button
                  variant="contained"
                  // color="error"
                  fullwidth="true"
                  sx={{ textTransform: "none" }}
                ></Button>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <FormControl fullwidth="true" color="info">
                  <Select
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ padding: 0 }}
                  >
                    <MenuItem value="">castVoteForMarketTicket</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Button
                  className="button-close"
                  variant="contained"
                  color="error"
                  fullwidth="true"
                  sx={{ textTransform: "none" }}
                >
                  CLOSE THIS MARKET
                </Button>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Button
                  className="button-claim"
                  variant="contained"
                  color="primary"
                  fullwidth="true"
                  sx={{ textTransform: "none" }}
                >
                  Claim Ticket Rewards
                </Button>
              </Box>
            </Card>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default RoomPage;
