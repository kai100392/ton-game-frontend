import React, { useState } from "react";
// import ReactJson, { InteractionProps } from "react-json-view";
import {
  SendTransactionRequest,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { Container, Box } from "@mui/material";
import RoomCard from "../components/RoomCard";

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
// const defaultTx: SendTransactionRequest = {
//   // The transaction is valid for 10 minutes from now, in unix epoch seconds.
//   validUntil: Math.floor(Date.now() / 1000) + 600,
//   messages: [
//     {
//       // The receiver's address.
//       address: "EQCKWpx7cNMpvmcN5ObM5lLUZHZRFKqYA4xmw9jOry0ZsF9M",
//       // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
//       amount: "5000000",
//       // (optional) State initialization in boc base64 format.
//       stateInit:
//         "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
//       // (optional) Payload in boc base64 format.
//       payload: "te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==",
//     },

//     // Uncomment the following message to send two messages in one transaction.
//     /*
//     {
//       // Note: Funds sent to this address will not be returned back to the sender.
//       address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
//       amount: toNano('0.01').toString(),
//     }
//     */
//   ],
// };

export function LandingPage() {
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
          {[1, 2, 3, 0.5].map((weight, index) => (
            <RoomCard weight={weight} key={index} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
