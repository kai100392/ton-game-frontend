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

const roomInfo = ["0xdsf", "0xefoj"];

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
          <Button color="primary" variant="outlined">
            Dismiss
          </Button>
        </Toolbar>
      </div>

      <Box sx={{ marginTop: 8 }}>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            gap: 2,
          }}
        >
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
            {[1, 2, 3, 4].map((value, index) =>
              roomInfo[index] ? (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    {`Player${value} : ${roomInfo[index]}`}
                  </Button>
                </Box>
              ) : index === roomInfo.length ? (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    {`Player${value}[me] : xxxx`}
                  </Button>
                </Box>
              ) : (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >{`- - -`}</Button>
                </Box>
              )
            )}
          </Card>
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
          ></Card>
        </Box>
      </Box>
    </>
  );
};

export default RoomPage;
