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
  Link,
} from "@mui/material";
import Image from "next/image";
import {
  buyCallTicketWithPromoCode,
  exeArbPriceParityForTicket,
  getMarketForTicket,
} from "../../constants/contractActions";
import { ADDR_FACT } from "../../constants/address";
import factoryAbi from "../abi/CallitFactory.abi.json";
import BuyCallTicketModal from "../../components/BuyCallTicketModal";
import TicketButton from "../../components/TicketButton";

import { currentVersion } from "..";

// Trigger
const handleGetMarketDetailForTicket = async (signer, params) => {
  try {
    const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);

    const tempArray = await getMarketForTicket(contract, params);
    console.log(tempArray["name"]);
    let marketDetailData = {
      marketNum: tempArray["marketNum"].toNumber(),
      name: tempArray["name"],
      imgURL: tempArray["imgURL"],
      maker: tempArray["maker"],
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
    console.log("market Data", marketDetailData);
    return marketDetailData;
  } catch (error) {
    console.error("Error getting market detail :", error);
  }
};

const MarketPage = () => {
  const router = useRouter();
  const { id, account } = router.query;

  const [signer, setSigner] = useState(null);
  const [marketDetailData, setMarketDetailData] = useState(null);

  // To Buy Ticket
  const [buyTicketModalOpen, setBuyTicketModalOpen] = useState(false);
  const [ticketAddr, setTicketAddr] = useState(null);

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
    if (signer && id) {
      const detailData = await handleGetMarketDetailForTicket(signer, {
        _ticket: id,
      });
      setMarketDetailData(detailData);
    }
  }, [signer, id]); // Re-run only when `signer` or `id` changes

  // Trigger when ticket button is pressed
  const handleBuyTicketModalOpen = () => setBuyTicketModalOpen(true);

  const handleBuyTicketModalClose = () => setBuyTicketModalOpen(false);

  const handleBuyTicketWithPromoCode = async (params) => {
    try {
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await buyCallTicketWithPromoCode(contract, params);
      handleBuyTicketModalClose();
    } catch (error) {
      console.error("Error buying Ticket:", error);
    }
  };

  const handleExeArbPriceParityForTicket = async (params) => {
    try {
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await exeArbPriceParityForTicket(contract, params);
    } catch (error) {
      console.error("Error ExeArbPriceParity: ", error);
    }
  };
  return (
    <>
      {/* Top Navigation */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Image
              src="/logo.png"
              alt="Call-It Logo"
              width={150}
              height={50}
              onClick={() => router.push("/")}
            />
            {`version_${currentVersion}`}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Section */}
        <Card sx={{ flex: 3, padding: "20px" }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              alt="Vote"
              src="/vote_img.jpg"
              sx={{ width: 80, height: 80, marginRight: 2 }}
            />
            {marketDetailData && marketDetailData.name ? (
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {marketDetailData.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  $196,900,355 Bet &nbsp; • &nbsp;{marketDetailData.category}
                  {/* {marketDetailData ? marketDetailData : null} */}
                </Typography>
              </Box>
            ) : null}
          </Box>

          {marketDetailData && marketDetailData.name ? (
            <Box mb={2}>
              <Typography variant="h6" color="text.secondary">
                MarketNum:
                {marketDetailData.marketNum}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Maker:
                {marketDetailData.maker}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Rule:
                {marketDetailData.rule}
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
                          {`${marketDetailData.marketResults.resultTokenVotes[index]} people bet`}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <Typography variant="p" fontWeight="bold">
                        {`Price Percent(%)`}
                      </Typography>
                      <Box display="flex" ml={2}>
                        <TicketButton
                          color="success"
                          label="Bet"
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
                          label="OnDex"
                          ticketAddr={
                            marketDetailData.marketResults.resultOptionTokens[
                              index
                            ]
                          }
                          handleBuyTicketModalOpen={handleBuyTicketModalOpen}
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
        <Card sx={{ flex: 1, padding: "20px" }}>
          {/* <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginRight: 1 }}
          >
            Yes 73.7¢
          </Button>
          <Button variant="outlined" fullWidth>
            No 26.7¢
          </Button>
        </Box> */}

          {/* <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          Outcome
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Button variant="contained" color="success">
            Buy
          </Button>
          <Button variant="outlined">Sell</Button>
          <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
            Market
          </Button>
        </Box> */}

          {/* <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Amount</Typography>
          <Box display="flex" alignItems="center">
            <Button>-</Button>
            <Typography mx={2}>$0</Typography>
            <Button>+</Button>
          </Box>
        </Box> */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            mt={10}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuyTicketModalOpen}
              sx={{ textTransform: "none" }}
            >
              buyCallTicketWithPromoCode
            </Button>
          </Box>
          <Box
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
              exeArbPriceParityForTicket
            </Button>
          </Box>
          <Box
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
              closeMarketCallsForTicket
            </Button>
          </Box>
          <Box
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
              castVoteForMarketTicket
            </Button>
          </Box>
          <Box
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
              closeMarketForTicket
            </Button>
          </Box>
          <Box
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
              claimTicketRewards
            </Button>
          </Box>
        </Card>
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
