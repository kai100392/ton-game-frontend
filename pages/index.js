import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import factoryAbi from "./abi/CallitFactory.abi.json";
import vaultAbi from "./abi/CallitVault.abi.json";
// import { abi } from "../constants/abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TonConnectButton } from "@tonconnect/ui-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
  setMarketInfo,
  getUSDBalance,
  getMarketsForMakerOrCategory,
  depositToVault,
  getMarketCntForMakerOrCategory,
} from "../constants/contractActions";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import MarketCard from "../components/MarketCard";
import CreateMarketModal from "../components/CreateMarketModal";
import SetMarketInfoModal from "../components/SetMarketInfoModal";

import {
  contractAddress,
  ADDR_FACT,
  ADDR_VAULT,
  ADDR_DELEGATE,
} from "../constants/address";
import DepositToVaultModal from "../components/DepositToVaultModal";
import RoomCard from "../components/RoomCard";

// version display
export const currentVersion = "0.41";

// Custom style for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

export const injected = new InjectedConnector();

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  //Wallet Connecting States
  const [balance, setBalance] = useState(null);
  const [hasMetamask, setHasMetamask] = useState(null);
  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  //Markets Management States
  const [onlyMyMarkets, setOnlyMyMarkets] = useState(false); //Checkbox for mine filter
  const [marketCategory, setMarketCategory] = useState(""); //Combobox for category filter
  const [marketsList, setMarketsList] = useState([]); //Main Data for Grid View
  let marketsArray = [];
  const [ticketForSetInfo, setTicketForSetInfo] = useState(""); // input as _anyTicket for SM setMarketInfo

  //Modal Control States
  const [createModalopen, setCreateModalOpen] = useState(false);
  const [setInfoModalOpen, setSetInfoModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);

  //For Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxCntPerPage = 6;
  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  // Using useEffect to fetch data when the component mounts
  const [loading, setLoading] = useState(true); // For Spinner Screen - potential
  useEffect(() => {
    refreshMarketList();
    handleGetBalance();
  }, [account, onlyMyMarkets, marketCategory, page, totalPages]); // Empty dependency array means this effect runs only once when the component mounts

  const refreshMarketList = async () => {
    console.log("Market List refreshing...");
    if (account == undefined) {
      setLoading(false);
      return;
    }

    let maker = "";
    if (onlyMyMarkets) maker = account;
    else maker = "0x0000000000000000000000000000000000000000";

    const marektCnt = await handleGetMarketCntForMakerOrCategory({
      _maker: maker,
      // _maker: account,
      _category: marketCategory,
    });
    console.log("market count: ", marektCnt);

    //page control
    setTotalPages(Math.ceil(marektCnt / maxCntPerPage));
    console.log("ceil value is ", Math.ceil(marektCnt / maxCntPerPage));
    console.log("totalPage is ", totalPages);

    let idxStart = (page - 1) * maxCntPerPage;
    let retCnt =
      page < totalPages
        ? maxCntPerPage
        : marektCnt % maxCntPerPage == 0
        ? maxCntPerPage
        : marektCnt % maxCntPerPage;
    const params = {
      _category: marketCategory,
      _maker: maker,
      _all: true,
      _live: true,
      _idxStart: idxStart,
      _retCnt: retCnt,
    };
    console.log("getMarkets Function's params: ", params);
    const tempArray = await handleGetMarketsForMakerOrCategory(params);
    if (tempArray == undefined) return;
    console.log("marketArray displays :", tempArray.length);
    for (let i = 0; i < tempArray.length; i++) {
      marketsArray[i] = {
        marketNum: tempArray[i]["marketNum"],
        name: tempArray[i]["name"],
        imgURL: tempArray[i]["imgURL"],
        maker: tempArray[i]["maker"],
        category: tempArray[i]["category"],
        live: tempArray[i]["live"],
        rules: tempArray[i]["rules"],
        winningVoteResult: tempArray[i]["winningVoteResult"],
        blockNumber: tempArray[i]["blockNumber"],
        blockTimestamp: tempArray[i]["blockTimestamp"],
        marketResults: { resultLabels: [], resultOptionTokens: [] },
      };
      for (
        let j = 0;
        j < tempArray[i]["marketResults"]["resultLabels"].length;
        j++
      ) {
        marketsArray[i].marketResults.resultLabels[j] =
          tempArray[i]["marketResults"]["resultLabels"][j];
        marketsArray[i].marketResults.resultOptionTokens[j] =
          tempArray[i]["marketResults"]["resultOptionTokens"][j];
      }
    }
    setMarketsList(marketsArray);
    setLoading(false);
    console.log("Market List Updated");
  };
  //Functions to manage markets
  const handleMarketCheck = () => {
    if (onlyMyMarkets) setOnlyMyMarkets(false);
    else setOnlyMyMarkets(true);
  };
  const handleCategorySelect = (event) => {
    setMarketCategory(event.target.value); // Update the age state based on the selected value
  };

  // Functions to handle modal actions
  const handleCreateModalOpen = () => setCreateModalOpen(true);

  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleSetInfoModalOpen = () => setSetInfoModalOpen(true);

  const handleSetInfoModalClose = () => setSetInfoModalOpen(false);

  const handleDepositModalOpen = () => setDepositModalOpen(true);

  const handleDepositModalClose = () => setDepositModalOpen(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      await activate(injected);
      setHasMetamask(true);
      console.log("User's wallet address:", account);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Get balance from vault
  const handleGetBalance = async () => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDR_VAULT, vaultAbi, signer);
      const usdBalance = await getUSDBalance(contract, {
        _acct: account,
      });
      setBalance(usdBalance.toNumber() / 10 ** 6);
    } catch (error) {
      console.error("Error getting your balance:", error);
    }
  };

  // Trigger market creation
  const handleCreateMarket = async (marketParams) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);

    try {
      await makeNewMarket(contract, marketParams);
      console.log("Market created successfully!");
    } catch (error) {
      console.error("Error creating market:", error);
    }
    await refreshMarketList();
    handleGetBalance();
    handleCreateModalClose();
  };

  // Trigger set market infomation
  const handleSetMarketInfo = async (params) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      await setMarketInfo(contract, params);
      console.log("Market Info Updated!");
    } catch (error) {
      console.error("Error creating market:", error);
    }
    await refreshMarketList();
    handleSetInfoModalClose();
  };

  // Trigger
  const handleGetMarketsForMakerOrCategory = async (params) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      const marketsArray = await getMarketsForMakerOrCategory(contract, params);
      // await getMarketHashesForMakerOrCategory(contract,params); //TEST

      return marketsArray;
    } catch (error) {
      console.error("Error getting markets:", error);
    }
  };

  // Trigger
  const handleGetMarketCntForMakerOrCategory = async (params) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDR_FACT, factoryAbi, signer);
      const count = await getMarketCntForMakerOrCategory(contract, params);
      console.log("Market Count For Category Called: ", count);
      return count;
    } catch (error) {
      console.error("Error getting markets:", error);
    }
  };

  // Trigger
  const handleDepositToVault = async (params) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDR_VAULT, vaultAbi, signer);
      await depositToVault(contract, params);
      console.log("You deposited successfully");
      handleGetBalance();
    } catch (error) {
      console.error("Error depositing:", error);
    }
    handleDepositModalClose();
  };

  // Add similar handlers for all other functions like exeAerriceParityForTicket, castVoteForMarketTicket, claim rewards, etc.

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, [setHasMetamask]);

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      console.log("User's wallet address:", account);
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
      <TonConnectUIProvider
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
        walletsListConfiguration={{
          includeWallets: [
            {
              appName: "telegram-wallet",
              name: "Wallet",
              imageUrl: "https://wallet.tg/images/logo-288.png",
              aboutUrl: "https://wallet.tg/",
              universalLink: "https://t.me/wallet?attach=wallet",
              bridgeUrl: "https://bridge.ton.space/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "tonwallet",
              name: "TON Wallet",
              imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
              aboutUrl:
                "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
              universalLink: "https://wallet.ton.org/ton-connect",
              jsBridgeKey: "tonwallet",
              bridgeUrl: "https://bridge.tonapi.io/bridge",
              platforms: ["chrome", "android"],
            },
            {
              appName: "nicegramWallet",
              name: "Nicegram Wallet",
              imageUrl: "https://static.nicegram.app/icon.png",
              aboutUrl: "https://nicegram.app",
              universalLink: "https://nicegram.app/tc",
              deepLink: "nicegram-tc://",
              jsBridgeKey: "nicegramWallet",
              bridgeUrl: "https://tc.nicegram.app/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "tokenpocket",
              name: "TokenPocket",
              imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
              aboutUrl: "https://www.tokenpocket.pro",
              universalLink: "https://tp-lab.tptool.pro/ton-connect/",
              jsBridgeKey: "tokenpocket",
              bridgeUrl: "https://ton-connect.mytokenpocket.vip/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "dewallet",
              name: "DeWallet",
              imageUrl:
                "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
              aboutUrl: "https://delabwallet.com",
              universalLink: "https://t.me/dewallet?attach=wallet",
              bridgeUrl: "https://bridge.dewallet.pro/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "cdcTonWallet",
              name: "Crypto.com DeFi Wallet",
              imageUrl: "https://apro-ncw-api-file.crypto.com/wallet/logo",
              aboutUrl: "https://crypto.com/defi-wallet",
              universalLink: "https://wallet.crypto.com/deeplink/ton-connect",
              deepLink: "dfw://",
              jsBridgeKey: "cdcTonWallet",
              bridgeUrl: "https://wallet.crypto.com/sse/tonbridge",
              platforms: ["ios", "android", "chrome"],
            },
            {
              appName: "tobi",
              name: "Tobi",
              imageUrl: "https://app.tobiwallet.app/icons/logo.png",
              aboutUrl: "https://tobi.fun",
              universalLink: "https://t.me/TobiCopilotBot?attach=wallet",
              bridgeUrl: "https://ton-bridge.tobiwallet.app/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "trustwalletTon",
              name: "Trust",
              imageUrl:
                "https://assets-cdn.trustwallet.com/dapps/trust.logo.png",
              aboutUrl: "https://trustwallet.com/about-us",
              bridgeUrl: "https://tonconnect.trustwallet.com/bridge",
              universalLink: "https://link.trustwallet.com/tc",
              deepLink: "trust://ton-connect",
              jsBridgeKey: "trustwalletTon",
              platforms: ["chrome", "ios", "android"],
            },
            {
              appName: "bitgetWalletLite",
              name: "Bitget Wallet Lite",
              imageUrl:
                "https://raw.githubusercontent.com/bitgetwallet/download/main/logo/png/bitget_wallet_lite_logo.png",
              aboutUrl: "https://web3.bitget.com",
              universalLink: "https://t.me/BitgetWallet_TGBot?attach=wallet",
              bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "onekey",
              name: "OneKey",
              imageUrl: "https://common.onekey-asset.com/logo/onekey-x288.png",
              aboutUrl: "https://onekey.so",
              jsBridgeKey: "onekeyTonWallet",
              platforms: ["chrome"],
            },
            {
              appName: "tomoWallet",
              name: "Tomo Wallet",
              imageUrl: "https://pub.tomo.inc/logo.png",
              aboutUrl: "https://www.tomo.inc/",
              universalLink: "https://t.me/tomowalletbot?attach=wallet",
              bridgeUrl: "https://go-bridge.tomo.inc/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "hpyTonWallet",
              name: "HyperPay Wallet",
              imageUrl: "https://onchain-oss.hyperpay.online/images/logo.png",
              aboutUrl: "https://www.hyperpay.tech",
              universalLink:
                "https://www.hyperpay.tech/download&deeplink=hyperpay://web3/wallet/tonconnect",
              jsBridgeKey: "hpyTonWallet",
              bridgeUrl: "https://onchain-wallet.hyperpay.online/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "unstoppable",
              name: "Unstoppable Wallet",
              imageUrl: "https://unstoppable.money/logo288.png",
              aboutUrl: "https://unstoppable.money/",
              universalLink: "https://unstoppable.money/ton-connect",
              bridgeUrl: "https://bridge.unstoppable.money/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "foxwallet",
              name: "FoxWallet",
              imageUrl: "https://hc.foxwallet.com/img/logo.png",
              aboutUrl: "https://foxwallet.com/",
              universalLink: "https://link.foxwallet.com/tc",
              jsBridgeKey: "foxwallet",
              bridgeUrl: "https://connect.foxwallet.com/ton/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "jambo",
              name: "Jambo",
              imageUrl:
                "https://cdn-prod.jambotechnology.xyz/content/jambo_288x288_02da416a6c.png",
              aboutUrl: "https://www.jambo.technology/",
              deepLink: "jambotc://",
              universalLink: "https://jambophone.xyz/",
              bridgeUrl: "https://bridge.tonapi.io/bridge",
              jsBridgeKey: "jambowallet",
              platforms: ["android", "macos", "windows", "linux"],
            },
            {
              appName: "Gate.io wallet",
              name: "Gate.io wallet",
              imageUrl:
                "https://gimg2.gateimg.com/tgwallet/1730688473495507406-Gatewallet.png",
              aboutUrl: "https://www.gate.io",
              universalLink: "https://t.me/gateio_wallet_bot?attach=wallet",
              bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
              platforms: ["ios", "android", "linux", "windows", "macos"],
            },
            {
              appName: "coin98",
              name: "Coin98 ",
              imageUrl:
                "https://coin98.s3.ap-southeast-1.amazonaws.com/SocialLogo/ninetyeight.png",
              aboutUrl: "https://docs.coin98.com",
              deepLink: "coin98://ton-connect",
              bridgeUrl: "https://https://ton-bridge.coin98.tech/bridge",
              platforms: ["ios", "android"],
              universalLink: "https://coin98.com/ton-conect",
            },
            {
              appName: "miraiapp-tg",
              name: "Mirai App",
              imageUrl:
                "https://cdn.mirailabs.co/miraihub/miraiapp-tg-icon-288.png",
              aboutUrl: "https://mirai.app",
              universalLink: "https://t.me/MiraiAppBot?attach=wallet",
              bridgeUrl: "https://bridge.tonapi.io/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "nestwallet",
              name: "Nest Wallet",
              imageUrl:
                "https://storage.googleapis.com/nestwallet-public-resource-bucket/logo/nest_logo_square.png",
              aboutUrl: "https://www.nestwallet.xyz",
              jsBridgeKey: "nestwallet",
              platforms: ["chrome"],
            },
            {
              appName: "architec.ton",
              name: "Architec.ton",
              imageUrl:
                "https://raw.githubusercontent.com/Architec-Ton/wallet-tma/refs/heads/dev/public/images/arcwallet_logo.png",
              aboutUrl: "https://architecton.tech",
              universalLink: "https://t.me/architec_ton_bot?attach=wallet",
              bridgeUrl: "https://tonconnect.architecton.site/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
            {
              appName: "uxuyWallet",
              name: "UXUY Wallet",
              imageUrl:
                "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
              aboutUrl: "https://docs.uxuy.com",
              universalLink: "https://t.me/UXUYbot?attach=wallet",
              bridgeUrl: "https://bridge.uxuy.me/bridge",
              platforms: ["ios", "android", "macos", "windows", "linux"],
            },
          ],
        }}
        actionsConfiguration={{
          twaReturnUrl: "https://t.me/DemoDappWithTonConnectBot/demo",
        }}
      >
        <div className="app">
          <div
            className="navbar"
            position="static"
            color="default"
            elevation={0}
          >
            <Toolbar>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                style={{ cursor: "pointer" }}
                component="a"
                href="/"
              >
                <div
                  onClick={() => router.push("/")} // Navigate on click
                  className="logo-container"
                >
                  <Image
                    src={"/ton.png"} // Switch image based on hover state
                    alt="Call-It Logo"
                    width={70}
                    height={70}
                    className={isHovered ? "slide-right" : "slide-left"} // Apply CSS class based on hover state
                  />
                </div>
              </Typography>

              <TonConnectButton />
            </Toolbar>
          </div>
        </div>
      </TonConnectUIProvider>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <div
          className="typography"
          variant="h10"
          component="h5"
          gutterbottom="true"
          align="center"
        >
          <Image
            src="/logo.png"
            alt="Call-It Logo"
            width={300}
            height={100}
            onClick={() => router.push("/")}
          />
        </div>
        <div className="typography" variant="h5" gutterbottom="true">
          TON Smart Game
        </div>

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          {/* Room Cards */}
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-around"
            sx={{ padding: 2 }}
          >
            {[1, 2, 3, 4].map((weight, index) => (
              <RoomCard weight={weight} />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          background:
            "linear-gradient(40deg, #000000 0%, #1a1a1a 33%, #333333 67%, #4d4d4d 100%)",
          color: "#ffffff",
          padding: 2,
          marginTop: 6,
          fontWeight: "bold", // This makes the font bold
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center" fontWeight="bold">
            © 2024 CALL-It. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="/about" passHref>
            <Button
              variant="contained"
              style={{
                background:
                  "linear-gradient(40deg, #ff0000 0%, #e200f3 33%, #314bff 67%, #00b6d1 100%)",
                color: "white", // Ensures the text color is visible
                position: "relative",
                zIndex: 1,
              }}
              sx={{
                mb: 2, // Margin bottom for spacing between buttons
                width: ["100%", "auto"], // Full width on small screens, auto width on larger screens
              }}
            >
              About Us
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                mb: 2,
                width: ["100%", "auto"],
              }}
            >
              Contact Us
            </Button>
          </Link>
          <Link href="/market" passHref>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                mb: 2,
                width: ["100%", "auto"],
              }}
            >
              Market Page
            </Button>
          </Link>
        </Box>
      </Container>

      {/* Modal */}
      <CreateMarketModal
        createModalopen={createModalopen}
        handleCreateModalClose={handleCreateModalClose}
        handleCreateMarket={handleCreateMarket}
      />

      <SetMarketInfoModal
        setInfoModalOpen={setInfoModalOpen}
        handleSetInfoModalClose={handleSetInfoModalClose}
        handleSetMarketInfo={handleSetMarketInfo}
        ticket={ticketForSetInfo}
      />

      <DepositToVaultModal
        depositModalOpen={depositModalOpen}
        handleDepositModalClose={handleDepositModalClose}
        handleDepositToVault={handleDepositToVault}
        balance={balance}
        account={account}
      />
    </>
  );
}
