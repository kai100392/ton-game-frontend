import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styles from '../styles/Home.module.css';

const MyAppBar = () => {
  return (
    <AppBar position="fixed" className={styles.navbarWrapper}>
      <Toolbar className={styles.navbarContainer}>
        <Typography variant="h6" className={styles.navbarTitle}>
          MyMarket
        </Typography>
        <Box className={styles.navbarMenu}>
          <Link href="/" passHref>
            <Button className={styles.navbarMenuItemLink}>
              Home
            </Button>
          </Link>
          <Link href="/markets" passHref>
            <Button className={styles.navbarMenuItemLink}>
              Markets
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button className={styles.navbarMenuItemLink}>
              About
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button className={styles.navbarMenuItemLink}>
              Contact
            </Button>
          </Link>
        </Box>
        <Button className={styles.navbarButton} onClick={() => alert('Login functionality here')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
