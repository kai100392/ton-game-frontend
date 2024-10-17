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
  Grid2, // Import Grid2 from MUI
} from "@mui/material";
import Image from "next/image";
import {
  buyCallTicketWithPromoCode,
  castVoteForMarketTicket,
  exeArbPriceParityForTicket,
  closeMarketCallsForTicket,
  getMarketForTicket,
  getUSDBalance,
} from "../../constants/contractActions";
import { ADDR_FACT, ADDR_VAULT } from "../../constants/address";
import factoryAbi from "../abi/CallitFactory.abi.json";
import vaultAbi from "../abi/CallitVault.abi.json";
import BuyCallTicketModal from "../../components/BuyCallTicketModal";
import TicketButton from "../../components/TicketButton";

import { currentVersion } from "..";
import { getPricePercentDataFromDex } from "../api/getDexData";
import { getNameSymbolDataFromDex } from "../api/getDexData";
import { getLiquidityDataFromDex } from "../api/getDexData";

// Trigger
const handleGetMarketDetailForTicket = async (signer, params) => {
  // ... (existing code)
};

const MarketPage = () => {
  const router = useRouter();
  const { id, account } = router.query;

  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(null);
  const [marketDetailData, setMarketDetailData] = useState(null);
  const [pricePercent, setPricePercent] = useState([]);
  const [nameSymbol, setNameSymbol] = useState([]);
  const [usdLiquidty, setUsdLquidity] = useState(-1);
  
  // To Buy Ticket
  const [buyTicketModalOpen, setBuyTicketModalOpen] = useState(false);
  const [ticketAddr, setTicketAddr] = useState(null);

  // To castVote
  const [voteOption, setVoteOption] = useState("");

  useEffect(() => {
    // ... (existing code)
  }, [account]);

  // Another useEffect for handling the market detail call
  useEffect(async () => {
    // ... (existing code)
  }, [signer, id]);

  useEffect(async () => {
    // ... (existing code)
  }, [marketDetailData]);

  // Get balance from vault
  const handleGetBalance = async () => {
    // ... (existing code)
  };

  // Trigger when ticket button is pressed
  const handleBuyTicketModalOpen = () => setBuyTicketModalOpen(true);

  const handleBuyTicketModalClose = () => setBuyTicketModalOpen(false);

  const handleBuyTicketWithPromoCode = async (params) => {
    // ... (existing code)
  };

  const handleVoteSelect = (event) => {
    // ... (existing code)
  };

  useEffect(() => {
    // ... (existing code)
  }, [voteOption]);

  const handleCastVoteForMarketTicket = async (params) => {
    // ... (existing code)
  };

  const [deadlineDate, setDeadlineDate] = useState("");
  const [votingStartDate, setVotingStartDate] = useState("");
  const [votingEndDate, setVotingEndDate] = useState("");

  const convertUnixTimestampToDateTime = (timestamp) => {
    // ... (existing code)
  };

  const handleCloseMarketCallsModalOpen = async (params) => {
    // ... (existing code)
  }

  const handleExeArbPriceParityForTicket = async (params) => {
    // ... (existing code)
  };

  const [tokenData, setTokenData] = useState({});

  return (
    <>
      {/* Top Navigation */}
      <div className="navbar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Image
              src="/logo.png"
              alt="Call-It Logo"
              width={150}
              height={50}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            {`v${currentVersion}`}
          </Typography>

          <Button variant="outlined" color="info" onClick={handleGetBalance}>
            balance : ${balance != null ? balance : "Press me"}
          </Button>
        </Toolbar>
      </div>

      <Box sx={{ padding: "20px" }}>
        <Grid2 container spacing={2}>
          {/* Left Section */}
          <Grid2 item xs={12} sm={8} md={9}> {/* Adjust the sizes for different breakpoints */}
            <Card sx={{ padding: "20px" }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  alt="Vote"
                  src="/vote_img.jpg"
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                {marketDetailData && marketDetailData.name && marketDetailData.marketUsdAmnts ? (
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {marketDetailData.name} &nbsp; • &nbsp;{marketDetailData.category ? marketDetailData.category : '<category>'} &nbsp; 
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Status: {`${marketDetailData.marketDatetimes.dtCallDeadline < Math.floor(Date.now() / 1000) ? 'call deadline passed': 'CALLS OPEN'}`} &nbsp; 
                      {`${marketDetailData.marketDatetimes.dtResultVoteStart < Math.floor(Date.now() / 1000) ? (marketDetailData.marketDatetimes.dtResultVoteEnd < Math.floor(Date.now() / 1000) ? '+ voting ended': '+ voting started') : ''}`}
                      <br/>
                      Prize Pool: ${usdLiquidty} &nbsp; 
                    </Typography>
                  </Box>
                ) : null}
              </Box>

              {marketDetailData && marketDetailData.name ? (
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Maker: &nbsp; {marketDetailData.maker}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    MarketHash: &nbsp; {marketDetailData.marketHash}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    MarketNum: &nbsp; {marketDetailData.marketNum}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rules: &nbsp; {marketDetailData.rules}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Call Deadline: &nbsp; {deadlineDate} (no more bets!)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voting Starts: &nbsp; {votingStartDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voting Ends: &nbsp; {votingEndDate}
                  </Typography>
                </Box>
              ) : null}
              <Box mb={2}>
                <Typography variant="caption" color="text.secondary">
                  OUTCOME
                </Typography>
              </Box>

              {marketDetailData &&
              marketDetailData.marketResults &&
              marketDetailData.marketResults.resultLabels
                ? marketDetailData.marketResults.resultLabels.map(
                    (label, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Box display="flex" alignItems="center">
                          <Avatar
                            alt={label}
                            src={`/candidate_${index + 1}.jpg`} // Replace with actual images
                            sx={{ width: 40, height: 40, marginRight: 2 }}
                          />
                          <Box>
                            <Typography>{label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {`${marketDetailData.marketResults.resultDescrs[index]}`}
                            </Typography>
                          </Box>
                        </Box>

                        <Box display="flex" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            {`${marketDetailData.marketResults.resultOptionTokens[index]}`}
                            <br />
                            {`${nameSymbol[index]}`}
                            <br />
                            {`$${pricePercent[index]} (% to win)`}
                          </Typography>
                          <Box display="flex" ml={2}>
                            <TicketButton
                              color="success"
                              label="PROMO Buy"
                              ticketAddr={marketDetailData.marketResults.resultOptionTokens[index]}
                              handleBuyTicketModalOpen={handleBuyTicketModalOpen}
                              transferTicketAddr={setTicketAddr}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )
                  )
                : null}
            </Card>
          </Grid2>

          {/* Right Section */}
          <Grid2 item xs={12} sm={4} md={3}> {/* Adjust the sizes for different breakpoints */}
            <Card sx={{ padding: "20px" }}>
              <Box mb={2}>
                <Typography variant="h6">Actions</Typography>
                <FormControl fullWidth>
                  <Select
                    value={voteOption}
                    onChange={handleVoteSelect}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>Select your Vote</em>
                    </MenuItem>
                    {marketDetailData &&
                    marketDetailData.marketResults &&
                    marketDetailData.marketResults.resultLabels
                      ? marketDetailData.marketResults.resultLabels.map((label, index) => (
                          <MenuItem key={index} value={index}>
                            {label}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCastVoteForMarketTicket({ voteOption })}
                  disabled={voteOption === ""}
                >
                  Cast Vote
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleCloseMarketCallsModalOpen}
                  disabled={
                    !(marketDetailData && marketDetailData.marketResults.resultLabels)
                  }
                >
                  Close Market Calls
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleExeArbPriceParityForTicket}
                  disabled={
                    !(marketDetailData && marketDetailData.marketResults.resultLabels)
                  }
                >
                  Execute Price Parity
                </Button>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      {/* Modal to Buy Call Ticket */}
      <BuyCallTicketModal
        open={buyTicketModalOpen}
        onClose={handleBuyTicketModalClose}
        ticketAddr={ticketAddr}
        onBuy={handleBuyTicketWithPromoCode}
      />
    </>
  );
};

export default MarketPage;
