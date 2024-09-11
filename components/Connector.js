import Web3 from "web3";

// Create a new web3 instance with MetaMask as the provider
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export default web3;
