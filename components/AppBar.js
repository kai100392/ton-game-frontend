import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const MyAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography>
          MyMarket
        </Typography>
        <Box>
          <Link href="/" passHref>
            <Button>
              Home
            </Button>
          </Link>
          <Link href="/markets" passHref>
            <Button>
              Markets
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button>
              About
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button>
              Contact
            </Button>
          </Link>
        </Box>
        <Button onClick={() => alert('Login functionality here')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
