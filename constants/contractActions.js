import web3 from "../components/Connector";
import contractABI from "../pages/abi/CallitFactory.abi.json";

// const contractAddress = "0xf9Aede2C017A2cF51eB00d7f2C5b59d388440068"; // Replace with your contract address
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// Make a new market
export const makeNewMarket = async (contract, marketParams) => {
  const {
    _name,
    _usdAmntLP,
    _dtCallDeadline,
    _dtResultVoteStart,
    _dtResultVoteEnd,
    _resultLabels,
    _resultDescrs,
  } = marketParams;
  console.log("contract--", _resultLabels);
  try {
    const tx = await contract.makeNewMarket(
      _name,
      _usdAmntLP,
      _dtCallDeadline,
      _dtResultVoteStart,
      _dtResultVoteEnd,
      _resultLabels,
      _resultDescrs
    );
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in makeNewMarket:", error);
    throw error;
  }
};

// Buy call ticket with promo code
export const buyCallTicketWithPromoCode = async (
  contract,
  fromAddress,
  promoCode
) => {
  try {
    return await contract
      .buyCallTicketWithPromoCode(promoCode)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in buyCallTicketWithPromoCode:", error);
    throw error;
  }
};

// Execute air parity for ticket
export const exeAerriceParityForTicket = async (
  contract,
  fromAddress,
  ticketId
) => {
  try {
    return await contract.methods
      .exeAerriceParityForTicket(ticketId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in exeAerriceParityForTicket:", error);
    throw error;
  }
};

// Close market calls for ticket
export const closeMarketCallsForTicket = async (
  contract,
  fromAddress,
  ticketId
) => {
  try {
    return await contract.methods
      .closeMarketCallsForTicket(ticketId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in closeMarketCallsForTicket:", error);
    throw error;
  }
};

// Cast vote for market ticket
export const castVoteForMarketTicket = async (
  contract,
  fromAddress,
  marketId,
  vote
) => {
  try {
    return await contract.methods
      .castVoteForMarketTicket(marketId, vote)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in castVoteForMarketTicket:", error);
    throw error;
  }
};

// Close market for ticket
export const closeMarketForTicket = async (contract, fromAddress, ticketId) => {
  try {
    return await contract.methods
      .closeMarketForTicket(ticketId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in closeMarketForTicket:", error);
    throw error;
  }
};

// Claim ticket rewards
export const claimTicketRewards = async (contract, fromAddress, ticketId) => {
  try {
    return await contract.methods
      .claimTicketRewards(ticketId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in claimTicketRewards:", error);
    throw error;
  }
};

// Claim voter rewards
export const claimVoterRewards = async (contract, fromAddress, marketId) => {
  try {
    return await contract.methods
      .claimVoterRewards(marketId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in claimVoterRewards:", error);
    throw error;
  }
};

// Claim promoter rewards
export const claimPromotorRewards = async (
  contract,
  fromAddress,
  promoterId
) => {
  try {
    return await contract.methods
      .claimPromotorRewards(promoterId)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in claimPromotorRewards:", error);
    throw error;
  }
};
