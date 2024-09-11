import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import abi from "./abi/CallitFactory.abi.json";
// import { abi } from "../constants/abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import {
  makeNewMarket,
  buyCallTicketWithPromoCode,
  exeAerriceParityForTicket,
  closeMarketCallsForTicket,
  castVoteForMarketTicket,
  closeMarketForTicket,
  claimTicketRewards,
  claimVoterRewards,
  claimPromotorRewards,
} from "../constants/contractActions";
import web3 from "../components/Connector";

export const injected = new InjectedConnector();

export default function Home() {
  const [account, setAccount] = useState(null);
  const [marketParams, setMarketParams] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [marketId, setMarketId] = useState("");
  const [vote, setVote] = useState("");

  const [hasMetamask, setHasMetamask] = useState(null);
  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Trigger market creation
  const handleCreateMarket = async () => {
    try {
      await makeNewMarket(account, marketParams);
      console.log("Market created successfully!");
    } catch (error) {
      console.error("Error creating market:", error);
    }
  };

  // Trigger buy ticket with promo code
  const handleBuyTicket = async () => {
    try {
      await buyCallTicketWithPromoCode(account, promoCode);
      console.log("Ticket bought successfully!");
    } catch (error) {
      console.error("Error buying ticket:", error);
    }
  };
  // Add similar handlers for all other functions like exeAerriceParityForTicket, castVoteForMarketTicket, claim rewards, etc.

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const {
    active,
    activate,
    chainId,
    // account,
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
    <>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Prediction Market dApp
        </Typography>

        <Button variant="outlined" onClick={connectWallet}>
          Connect MetaMask
        </Button>

        <Typography variant="h6" gutterBottom>
          Create a New Market
        </Typography>
        <TextField
          label="Market Parameters"
          value={marketParams}
          onChange={(e) => setMarketParams(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMarket}
        >
          Create Market
        </Button>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Buy Call Ticket with Promo Code
        </Typography>
        <TextField
          label="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleBuyTicket}>
          Buy Ticket
        </Button>
      </Container>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PredictIt
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              <Image
                src="/banner.jpg" // Placeholder for image
                alt="Banner"
                width={800}
                height={400}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  2024 Presidential Election Winner
                </Typography>
                <Typography variant="body2">
                  Kamala Harris: 55%
                  <br />
                  Donald Trump: 48%
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Electoral College Margin
                </Typography>
                <Typography variant="body2">270 to Win</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Container
        maxWidth="lg"
        sx={{ mt: 4, py: 4, backgroundColor: "#f0f0f0" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Browse Markets
                </Typography>
                <Typography>
                  Check out available markets and predict the outcome.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Make a Prediction
                </Typography>
                <Typography>
                  Buy shares for or against an event to take part in
                  predictions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trade Your Shares
                </Typography>
                <Typography>
                  Buy and sell your shares to earn rewards when you're right.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Additional Sections */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Newsletters Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Newsletters
                </Typography>
                <Typography>
                  Daily Markets Monday
                  <br />
                  Daily Markets Tuesday
                  <br />
                  Daily Markets Wednesday
                  <br />
                  Daily Markets Thursday
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Research Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Empowering Research
                </Typography>
                <Typography>
                  Learn more about how prediction markets empower academic
                  research.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: "#1976d2", color: "white", mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © 2024 PredictIt. All rights reserved.
          </Typography>
        </Container>
      </Box>
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
    </>
  );
}
