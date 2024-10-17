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

const colors = {
  primary: "#A45DBB",
  secondary: "#FF0000",
  background: "#151029",
  text: "#FFFFFF",
};

// Trigger
const handleGetMarketDetailForTicket = async (signer, params) => {
  try {
    const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);

    let tempArray = await getMarketForTicket(contract, params);
    let marketDetailData = {
      marketNum: tempArray["marketNum"].toNumber(),
      name: tempArray["name"],
      imgURL: tempArray["imgURL"],
      maker: tempArray["maker"],
      marketHash: tempArray["marketHash"],
      category: tempArray["category"],
      live: tempArray["live"],
      rules: tempArray["rules"],
      winningVoteResult: tempArray["winningVoteResult"],
      blockNumber: tempArray["blockNumber"],
      blockTimestamp: tempArray["blockTimestamp"],
      marketResults: {
        outcomeCnt: tempArray["marketResults"]["resultLabels"].length,
        resultLabels: [],
        resultDescrs: [],
        resultOptionTokens: [],
        resultTokenLPs: [],
        resultTokenVotes: [],
      },
      marketDatetimes: {
        dtCallDeadline:
          tempArray["marketDatetimes"]["dtCallDeadline"].toNumber(),
        dtResultVoteStart:
          tempArray["marketDatetimes"]["dtResultVoteStart"].toNumber(),
        dtResultVoteEnd:
          tempArray["marketDatetimes"]["dtResultVoteEnd"].toNumber(),
      },
      marketUsdAmnts: {
        usdAmntLP: null,
        usdAmntPrizePool: null,
        usdAmntPrizePool_net: null,
        usdRewwardPerVote: null,
        usdVoterRewardPool: null,
      },
    };
    for (let j = 0; j < marketDetailData.marketResults.outcomeCnt; j++) {
      marketDetailData.marketResults.resultLabels[j] =
        tempArray["marketResults"]["resultLabels"][j];
      marketDetailData.marketResults.resultDescrs[j] =
        tempArray["marketResults"]["resultDescrs"][j];
      marketDetailData.marketResults.resultOptionTokens[j] =
        tempArray["marketResults"]["resultOptionTokens"][j];
      marketDetailData.marketResults.resultTokenLPs[j] =
        tempArray["marketResults"]["resultTokenLPs"][j];
      marketDetailData.marketResults.resultTokenVotes[j] =
        tempArray["marketResults"]["resultTokenVotes"][j];

      marketDetailData.marketUsdAmnts.usdAmntLP =
        tempArray["marketUsdAmnts"]["usdAmntLP"].toNumber();
      marketDetailData.marketUsdAmnts.usdAmntPrizePool =
        tempArray["marketUsdAmnts"]["usdAmntPrizePool"].toNumber();
      marketDetailData.marketUsdAmnts.usdAmntPrizePool_net =
        tempArray["marketUsdAmnts"]["usdAmntPrizePool_net"].toNumber();
      marketDetailData.marketUsdAmnts.usdRewardPerVote =
        tempArray["marketUsdAmnts"]["usdRewardPerVote"].toNumber();
      marketDetailData.marketUsdAmnts.usdVoterRewardPool =
        tempArray["marketUsdAmnts"]["usdVoterRewardPool"].toNumber();
    }
    return marketDetailData;
    // return tempArray.json();
  } catch (error) {
    console.error("Error getting market detail :", error);
  }
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
    if (account == undefined) router.push("/");
    if (account) {
      // Create an ethers provider from the URL (web3 provider)
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      // Ensure provider is connected
      web3Provider.ready
        .then(() => {
          const signer = web3Provider.getSigner(); // Get the signer from the provider
          setSigner(signer);
          console.log("Signer is set successfully!");
        })
        .catch((error) => {
          console.error("Error setting up signer:", error);
        });
    }
  }, [account]);

  // Another useEffect for handling the market detail call
  useEffect(async () => {
    handleGetBalance();
    if (signer && id) {
      const detailData = await handleGetMarketDetailForTicket(signer, {
        _ticket: id,
      });
      setMarketDetailData(detailData);
    }
  }, [signer, id]); // Re-run only when `signer` or `id` changes

  useEffect(async () => {
    let priceStrArr = [];
    let nameSymbStr = [];
    let usdLiquidity = 0;
    if (marketDetailData != undefined) {
      for (let i = 0; i < marketDetailData.marketResults.resultOptionTokens.length; i++) {
        let tokAddr = marketDetailData.marketResults.resultOptionTokens[i];
        priceStrArr.push(await getPricePercentDataFromDex(tokAddr));
        nameSymbStr.push(await getNameSymbolDataFromDex(tokAddr));
        usdLiquidity += await getLiquidityDataFromDex(tokAddr);
      }
      
      setPricePercent(priceStrArr);
      setNameSymbol(nameSymbStr);
      setUsdLquidity(usdLiquidity);

      setDeadlineDate(
        convertUnixTimestampToDateTime(
          marketDetailData.marketDatetimes.dtCallDeadline
        )
      );
      setVotingStartDate(
        convertUnixTimestampToDateTime(
          marketDetailData.marketDatetimes.dtResultVoteStart
        )
      );
      setVotingEndDate(
        convertUnixTimestampToDateTime(
          marketDetailData.marketDatetimes.dtResultVoteEnd
        )
      );
    }
  }, [marketDetailData]);

  // Get balance from vault
  const handleGetBalance = async () => {
    try {
      const contract = new ethers.Contract(ADDR_VAULT, vaultAbi, signer);
      const usdBalance = await getUSDBalance(contract, {
        _acct: account,
      });
      setBalance(usdBalance.toNumber() / 10**6);
    } catch (error) {
      console.error("Error getting your balance:", error);
    }
  };

  // Trigger when ticket button is pressed
  const handleBuyTicketModalOpen = () => setBuyTicketModalOpen(true);

  const handleBuyTicketModalClose = () => setBuyTicketModalOpen(false);

  const handleBuyTicketWithPromoCode = async (params) => {
    try {
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await buyCallTicketWithPromoCode(contract, params);
      handleBuyTicketModalClose();
      handleGetBalance();
    } catch (error) {
      console.error("Error buying Ticket:", error);
    }
  };

  const handleVoteSelect = (event) => {
    setVoteOption(event.target.value);
  };

  useEffect(() => {
    if (marketDetailData == undefined || voteOption == "") return;
    console.log("voteOption selected: ", voteOption);

    handleCastVoteForMarketTicket({
      _senderTicketHash:
        marketDetailData.marketResults.resultOptionTokens[voteOption],
      _markHash: marketDetailData.marketHash,
    });
  }, [voteOption]);

  const handleCastVoteForMarketTicket = async (params) => {
    try {
      console.log("castVote params...", params);
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await castVoteForMarketTicket(contract, params);
      handleGetBalance();
    } catch (error) {
      console.error("Error Cast Vote:", error);
    }
  };

  const [deadlineDate, setDeadlineDate] = useState("");
  const [votingStartDate, setVotingStartDate] = useState("");
  const [votingEndDate, setVotingEndDate] = useState("");
  const convertUnixTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: userTimezone, // Specify your desired timezone
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return formatter.format(date);
  };

  const handleCloseMarketCallsModalOpen = async (params) => {
    try {
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await closeMarketCallsForTicket(contract, params);
    } catch (error) {
      console.error(" error w/ closeMarketCallsForTicket ");
    }
  }

  const handleExeArbPriceParityForTicket = async (params) => {
    try {
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await exeArbPriceParityForTicket(contract, params);
    } catch (error) {
      console.error("Error ExeArbPriceParity: ", error);
    }
  };

  // State to hold all token names and symbols from dex screener
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

      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >

        
        <div className="grid-container">
      
      {/* Left Section */}

      <Card   
        sx={{
          padding: "10px",
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto",
          color: "white",
          background: `radial-gradient(circle at 100% 100%, #373261 0, #373261 5px, transparent 5px) 0% 0%/8px 8px no-repeat,
                       radial-gradient(circle at 0 100%, #373261 0, #373261 5px, transparent 5px) 100% 0%/8px 8px no-repeat,
                       radial-gradient(circle at 100% 0, #27244E 0, #27244E 5px, transparent 5px) 0% 100%/8px 8px no-repeat,
                       radial-gradient(circle at 0 0, #27244E 0, #27244E 5px, transparent 5px) 100% 100%/8px 8px no-repeat,
                       linear-gradient(#373261, #27244E) 50% 50%/calc(100% - 6px) calc(100% - 16px) no-repeat,
                       linear-gradient(#373261, #27244E) 50% 50%/calc(100% - 16px) calc(100% - 6px) no-repeat,
                       linear-gradient(#ff0000 0%, #e200f3 33%, #314bff 67%, #00b6d1 100%)`,
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
            mb={3}
          >
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
                <Typography variant="subtitle1" textColor={colors.text}>
                  <b>Status:</b> {`${marketDetailData.marketDatetimes.dtCallDeadline < Math.floor(Date.now() / 1000) ? 'call deadline passed': 'CALLS OPEN'}`} &nbsp; 
                  {`${marketDetailData.marketDatetimes.dtResultVoteStart < Math.floor(Date.now() / 1000) ? (marketDetailData.marketDatetimes.dtResultVoteEnd < Math.floor(Date.now() / 1000) ? '+ voting ended': '+ voting started') : ''}`}
                  {/* • &nbsp; {`${marketDetailData.marketDatetimes.dtResultVoteStart < Math.floor(Date.now() / 1000) ? 'Voting Started': 'Voting not started'}`} &nbsp;  */}
                  <br/>
                  <b>Prize Pool: </b> ${usdLiquidty} &nbsp;
                </Typography>
              </Box>
            ) : null}
          </Box>

          {marketDetailData && marketDetailData.name ? (

              
            <Box mb={2}>
              <Typography variant="body2" textColor={colors.text}>
              <b>Maker: </b> &nbsp;
                {marketDetailData.maker}
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b> MarketHash: &nbsp;</b>
                {marketDetailData.marketHash}
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b> MarketNum: &nbsp;</b>
                {marketDetailData.marketNum}
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b> Rules: &nbsp;</b>
                {marketDetailData.rule}
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b>Call Deadline: &nbsp;</b>
                {/* {marketDetailData.marketDatetimes.dtCallDeadline} */}
                {deadlineDate} (no more bets!)
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b>Voting Starts: &nbsp;</b>
                {/* {marketDetailData.marketDatetimes.dtResultVoteStart} */}
                {votingStartDate}
              </Typography>
              <Typography variant="body2" textColor={colors.text}>
              <b>Voting Ends: &nbsp;</b>
                {/* {marketDetailData.marketDatetimes.dtResultVoteEnd} */}
                {votingEndDate}
              </Typography>
            </Box>
           
          ) : null}
          <Box mb={2}>
            <Typography variant="caption" textColor={colors.text}>
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
                        <Typography variant="caption" textColor={colors.text}>
                         <h4> {/* {`${marketDetailData.marketResults.resultTokenVotes[index]} people bet`} */}
                          {`${marketDetailData.marketResults.resultDescrs[index]}`}</h4>
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" textColor={colors.text}>
                      <h4>  {`${marketDetailData.marketResults.resultOptionTokens[index]}`}
                        <br />
                        {`${nameSymbol[index]}`}
                        <br />
                        {/* {`${Math.floor(pricePercent[index] / 100)} % to win`} */}
                        {`$${pricePercent[index]} (% to win)`}</h4>
                      </Typography>
                      
                      <Box display="flex" ml={2}>
                        <TicketButton
                          color="success"
                          label="PROMO Buy"
                          ticketAddr={
                            marketDetailData.marketResults.resultOptionTokens[
                              index
                            ]
                          }
                          handleBuyTicketModalOpen={handleBuyTicketModalOpen}
                          transferTicketAddr={setTicketAddr}
                        />
                        <TicketButton
                          color="error"
                          label="VIEW/TRADE"
                          ticketAddr={
                            marketDetailData.marketResults.resultOptionTokens[
                              index
                            ]
                          }
                          // handleBuyTicketModalOpen={handleBuyTicketModalOpen}
                          handleBuyTicketModalOpen={() => {
                            // window.open(`https://pulsex.mypinata.cloud/ipfs/bafybeift2yakeymqmjmonkzlx2zyc4tty7clkwvg37suffn5bncjx4e6xq/`, `_blank`);
                            // window.open(`https://app.pulsex.com/`,`_blank`);
                            window.open(
                              `https://dexscreener.com/pulsechain/${marketDetailData.marketResults.resultOptionTokens[index]}`,
                              `_blank`
                            );
                            // window.open(`https://dexscreener.com/pulsechain/${marketDetailData.marketResults.resultTokenLPs[index]}`,`_blank`);
                          }}
                          transferTicketAddr={setTicketAddr}
                        />

                        <Button
                          variant="contained"
                          color="info"
                          sx={{ marginRight: 1, textTransform: "none" }}
                          onClick={() =>
                            handleExeArbPriceParityForTicket({
                              _ticket:
                                marketDetailData.marketResults
                                  .resultOptionTokens[index],
                            })
                          }
                        >
                          exeArb
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )
              )
            : null}
        </Card>

        {/* Right Section */}
 
        <Card   
        sx={{
          padding: "10px",
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto",
          color: "white",
          background: `radial-gradient(circle at 100% 100%, #373261 0, #373261 5px, transparent 5px) 0% 0%/8px 8px no-repeat,
                       radial-gradient(circle at 0 100%, #373261 0, #373261 5px, transparent 5px) 100% 0%/8px 8px no-repeat,
                       radial-gradient(circle at 100% 0, #27244E 0, #27244E 5px, transparent 5px) 0% 100%/8px 8px no-repeat,
                       radial-gradient(circle at 0 0, #27244E 0, #27244E 5px, transparent 5px) 100% 100%/8px 8px no-repeat,
                       linear-gradient(#373261, #27244E) 50% 50%/calc(100% - 6px) calc(100% - 16px) no-repeat,
                       linear-gradient(#373261, #27244E) 50% 50%/calc(100% - 16px) calc(100% - 6px) no-repeat,
                       linear-gradient(#ff0000 0%, #e200f3 33%, #314bff 67%, #00b6d1 100%)`,
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
              color={`${marketDetailData && marketDetailData.marketUsdAmnts.usdAmntPrizePool == 0 ? 'info': 'error'}`}
              fullwidth="true"
              onClick={() =>
                handleCloseMarketCallsModalOpen({
                  _ticket:
                    marketDetailData.marketResults
                      .resultOptionTokens[0],
                })
              }
              sx={{ textTransform: "none" }}
            >
              {`${marketDetailData && marketDetailData.marketUsdAmnts.usdAmntPrizePool == 0 ? 'Call Deadline Passesd? (earn $CALL)': 'Calls Closed (NO MORE BETS!)'}`}
            </Button>
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
                value={voteOption}
                onChange={handleVoteSelect}
                sx={{ padding: 0 }}
              >
                <MenuItem value="">castVoteForMarketTicket</MenuItem>
                {marketDetailData &&
                marketDetailData.marketResults &&
                marketDetailData.marketResults.resultLabels
                  ? marketDetailData.marketResults.resultLabels.map(
                      (label, index) => (
                        <MenuItem key={index} value={`${index}`}>
                          {label}
                        </MenuItem>
                      )
                    )
                  : null}
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
              onClick={handleBuyTicketModalOpen}
              // onClick={handleCloseMarketModalOpen}
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
              onClick={handleBuyTicketModalOpen}
              sx={{ textTransform: "none" }}
            >
              Claim Ticket Rewards
            </Button>
          </Box>
        </Card>
        </div>
    
      </Box>
      <BuyCallTicketModal
        buyTicketModalOpen={buyTicketModalOpen}
        handleBuyTicketModalClose={handleBuyTicketModalClose}
        handleBuyTicketWithPromoCode={handleBuyTicketWithPromoCode}
        ticketAddr={ticketAddr}
      />
    </>
  );
};

export default MarketPage;
