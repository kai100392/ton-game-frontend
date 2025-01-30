import Image from "next/image";
import { useRouter } from "next/router";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import {
  SendTransactionRequest,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
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
import RoomCard from "../components/RoomCard";

// version display
export const currentVersion = "0.0.3";

export const injected = new InjectedConnector();

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

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
                    alt="TON-Game Logo"
                    width={70}
                    height={70}
                    className={isHovered ? "slide-right" : "slide-left"} // Apply CSS class based on hover state
                  />
                </div>
                {`v${currentVersion}`}
              </Typography>

              <TonConnectButton />
            </Toolbar>
          </div>
        </div>
        {/* Main Content */}
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
              © 2025 TON Smart Games. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </TonConnectUIProvider>

      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
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
    </>
  );
}
