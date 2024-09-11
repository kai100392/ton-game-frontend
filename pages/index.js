import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import abi from "./abi/CallitFactory.abi.json";
// import { abi } from "../constants/abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Typography, Button, Container, Box } from "@mui/material";
import Link from "next/link";

export const injected = new InjectedConnector();

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(injected);
        setHasMetamask(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Prediction Market App
        </Typography>
        <Link href="/about" passHref>
          <Button variant="contained" color="primary">
            About Us
          </Button>
        </Link>
        <Link href="/contact" passHref>
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
            Contact Us
          </Button>
        </Link>
        <Link href="/market" passHref>
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
            Market Page
          </Button>
        </Link>
      </Box>
      <div>
        {hasMetamask ? (
          active ? (
            "Connected! "
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )
        ) : (
          "Please install metamask"
        )}

        {active ? <button onClick={() => execute()}>Execute</button> : ""}
      </div>
    </Container>
  );
}
