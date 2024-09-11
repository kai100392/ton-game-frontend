import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Avatar from "@mui/material/Avatar";

const MarketCard = ({ title, bets, participants }) => {
  return (
    <Card sx={{ width: 300, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Top Section: Icon and Title */}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            alt="Presidential Seal"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Seal_of_the_President_of_the_United_States.svg"
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>

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
              {bets}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <MonetizationOnOutlinedIcon sx={{ marginRight: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {participants}
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
