import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Styles.css'; // Make sure to import your CSS file

const MyAppBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // Adjust threshold as needed
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbarContainer">
        <div className="navbarTitle">MyMarket</div>
        <div className="navbarMenu">
          <Link href="/" passHref>
            <a className="navbarMenuItemLink">Home</a>
          </Link>
          <Link href="/markets" passHref>
            <a className="navbarMenuItemLink">Markets</a>
          </Link>
          <Link href="/about" passHref>
            <a className="navbarMenuItemLink">About</a>
          </Link>
          <Link href="/contact" passHref>
            <a className="navbarMenuItemLink">Contact</a>
          </Link>
        </div>
        <button className="navbarButton" onClick={() => alert('Login functionality here')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default MyAppBar;
