import React, { useState } from "react";
// import ReactJson, { InteractionProps } from "react-json-view";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Container, Box } from "@mui/material";
import RoomCard from "../components/RoomCard";

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.

export default function LandingPage() {
  //   const [tx, setTx] = useState(defaultTx);

  const wallet = useTonWallet();
  console.log("wallet info: ", wallet);

  const [tonConnectUi] = useTonConnectUI();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <div
        className="typography"
        variant="h10"
        component="h5"
        gutterbottom="true"
        align="center"
      ></div>
      <div className="typography" variant="h5" gutterbottom="true">
        TON Smart Game
      </div>
      {wallet ? null : (
        <div align="center" variant="body">
          You must connect your wallet to enter
        </div>
      )}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        {/* Room Cards */}
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
          sx={{ padding: 4 }}
        >
          {[1, 2, 4, 0.01].map((weight, index) => (
            <RoomCard weight={weight} key={index} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
