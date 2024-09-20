import React from "react";
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
  id,
  title,
  category,
  live,
  isMine,
  handleSetInfoModalOpen,
  setTicketForSetInfo,
  marketResults,
}) => {
  return (
    <Card sx={{ width: 300, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Link href={`/market/${id}`} passHref>
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
                aria-label="comments"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Link navigation
                  setTicketForSetInfo(marketResults.resultOptionTokens[0]);
                  handleSetInfoModalOpen();
                }}
              >
                <Settings />
              </IconButton>
            ) : (
              <IconButton aria-label="comments" size="small" disabled>
                <SettingsOutlined />
              </IconButton>
            )}
          </Box>
        </Link>

        {/* Middle Section: Stats */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
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
    </Card>
  );
};

export default MarketCard;
