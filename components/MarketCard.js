import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Settings from "@mui/icons-material/Settings";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

const MarketCard = ({
  account,
  id,
  title,
  category,
  live,
  isMine,
  handleSetInfoModalOpen,
  setTicketForSetInfo,
  marketResults,
}) => {
  const router = useRouter();
  const aTicketAddress = marketResults.resultOptionTokens[0];
  
  return (
    <div className="cardBox">
    <Card>
      <Link
        href={{
          pathname: `/market/${aTicketAddress}`,
          query: { account: account },
        }}
        passHref
      >
        <CardContent>
          {/* Top Section: Icon and Title */}
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            justifyContent="space-between"
          >
            <Avatar
              alt="Presidential Seal"
              src="/vote_img.jpg"
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {isMine ? (
              <IconButton
                color="primary"
                aria-label="settings"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Link navigation
                  setTicketForSetInfo(aTicketAddress);
                  handleSetInfoModalOpen();
                }}
              >
                <Settings />
              </IconButton>
            ) : (
              <IconButton aria-label="settings" size="small" disabled>
                <SettingsOutlined />
              </IconButton>
            )}
          </Box>

          {/* Middle Section: Stats */}
          <Box className="cardBox">
            <Box display="flex" alignItems="center">
              <PushPinOutlinedIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {category}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PushPinOutlinedIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {live}
              </Typography>
            </Box>
            <IconButton aria-label="comments" size="small">
              <CommentOutlinedIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Link>
    </Card>
    </div>
  );
};

export default MarketCard;
