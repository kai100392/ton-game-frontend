import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const MyAppBar = () => {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className="navbarContainer">
        <Typography variant="h6" className="navbarTitle">
          MyMarket
        </Typography>
        <Box className="navbarMenu">
          <Link href="/" passHref>
            <Button className="navbarMenuItemLink">
              Home
            </Button>
          </Link>
          <Link href="/markets" passHref>
            <Button className="navbarMenuItemLink">
              Markets
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button className="navbarMenuItemLink">
              About
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button className="navbarMenuItemLink">
              Contact
            </Button>
          </Link>
        </Box>
        <Button className="navbarButton" onClick={() => alert('Login functionality here')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
