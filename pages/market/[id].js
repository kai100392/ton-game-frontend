import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getMarketForTicket } from "../../constants/contractActions";
import { ADDR_DELEGATE } from "../../constants/address";
import delegateAbi from "../abi/CallitDelegate.abi.json";

const marketData = [
  {
    name: "Kamala Harris",
    percentage: 74,
    betYes: 73.7,
    betNo: 26.7,
    amount: "$14,723,544",
  },
  {
    name: "Donald Trump",
    percentage: 26,
    betYes: 27,
    betNo: 75,
    amount: "$13,866,606",
  },
  {
    name: "Michelle Obama",
    percentage: 1,
    betYes: 0.6,
    betNo: 99.6,
    amount: "$13,174,885",
  },
  {
    name: "Other Democrat Politician",
    percentage: "<1",
    betYes: 0.4,
    betNo: 99.7,
    amount: "$9,792,490",
  },
  {
    name: "Hillary Clinton",
    percentage: "<1",
    betYes: 0.2,
    betNo: 99.9,
    amount: "$20,632,915",
  },
  {
    name: "Other Republican Politician",
    percentage: "<1",
    betYes: 0.3,
    betNo: 99.8,
    amount: "$13,328,889",
  },
  {
    name: "Robert F. Kennedy Jr.",
    percentage: "<1",
    betYes: 0.2,
    betNo: 99.9,
    amount: "$13,328,889",
  },
];

// Trigger
const handleGetMarketDetailForTicket = async (signer, params) => {
  try {
    const contract = new ethers.Contract(ADDR_DELEGATE, delegateAbi, signer);

    const marketDetailData = await getMarketForTicket(contract, params);
    console.log(marketDetailData[0]["name"]);
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
  useEffect(() => {
    if (signer && id) {
      const detailData = handleGetMarketDetailForTicket(signer, {
        _ticket: id,
      });
      setMarketDetailData(detailData);
    }
  }, [signer, id]); // Re-run only when `signer` or `id` changes
  return (
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
          {marketDetailData && marketDetailData.length > 0 ? (
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {marketDetailData[0]["name"]}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                $196,900,355 Bet &nbsp; • &nbsp;{" "}
                {/* {marketDetailData ? marketDetailData : null} */}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box mb={2}>
          <Typography variant="caption" color="text.secondary">
            OUTCOME
          </Typography>
        </Box>

        {marketData.map((outcome, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                alt={outcome.name}
                src={`/candidate_${index + 1}.jpg`} // Replace with actual images
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <Box>
                <Typography>{outcome.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {outcome.amount} Bet
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="bold">
                {outcome.percentage}%
              </Typography>
              <Box display="flex" ml={2}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginRight: 1 }}
                >
                  Bet Yes {outcome.betYes}¢
                </Button>
                <Button variant="contained" color="error">
                  Bet No {outcome.betNo}¢
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Card>

      {/* Right Section */}
      <Card sx={{ flex: 1, padding: "20px" }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            alt="Kamala Harris"
            src="/kamala_harris.jpg" // Replace with actual image
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          <Typography variant="h6">Kamala Harris</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
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
        </Box>

        <Typography
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
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Amount</Typography>
          <Box display="flex" alignItems="center">
            <Button>-</Button>
            <Typography mx={2}>$0</Typography>
            <Button>+</Button>
          </Box>
        </Box>

        <Button variant="contained" color="primary" fullWidth>
          Log In
        </Button>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Typography variant="caption" color="text.secondary">
            Avg price
          </Typography>
          <Typography variant="caption">0.0¢</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            Shares
          </Typography>
          <Typography variant="caption">0.00</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            Potential return
          </Typography>
          <Typography variant="caption" color="green">
            $0.00 (0.00%)
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default MarketPage;
