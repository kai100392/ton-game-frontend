import web3 from "../components/Connector";
import contractABI from "../pages/abi/CallitFactory.abi.json";

// Make a new market
export const makeNewMarket = async (contract, params) => {
  const {
    _name,
    _usdAmntLP,
    _dtCallDeadline,
    _dtResultVoteStart,
    _dtResultVoteEnd,
    _resultLabels,
    _resultDescrs,
  } = params;
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
export const buyCallTicketWithPromoCode = async (contract, params) => {
  const { _ticket, _promoCodeHash, _usdAmnt } = params;
  try {
    const tx = await contract.buyCallTicketWithPromoCode(
      _ticket,
      _promoCodeHash,
      _usdAmnt
    );
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in buyCallTicketWithPromoCode:", error);
    throw error;
  }
};

// Execute air parity for ticket
export const exeArbPriceParityForTicket = async (contract, params) => {
  const { _ticket } = params;
  try {
    const tx = await contract.exeArbPriceParityForTicket(_ticket);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in exeArbPriceParityForTicket:", error);
    throw error;
  }
};

// Close market calls for ticket
export const closeMarketCallsForTicket = async (contract, params) => {
  const { _ticket } = params;
  try {
    const tx = await contract.closeMarketCallsForTicket(_ticket);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in closeMarketCallsForTicket:", error);
    throw error;
  }
};

// Cast vote for market ticket
export const castVoteForMarketTicket = async (contract, params) => {
  const { _ticket } = params;
  try {
    const tx = await contract.castVoteForMarketTicket(_ticket);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in castVoteForMarketTicket:", error);
    throw error;
  }
};

// Close market for ticket
export const closeMarketForTicket = async (contract, params) => {
  const { _ticket } = params;
  try {
    const tx = await contract.closeMarketForTicket(_ticket);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in closeMarketForTicket:", error);
    throw error;
  }
};

// Claim ticket rewards
export const claimTicketRewards = async (contract, params) => {
  const { _ticket, _resultAgree } = params;
  try {
    const tx = await contract.claimTicketRewards(_ticket, _resultAgree);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in claimTicketRewards:", error);
    throw error;
  }
};

// Claim voter rewards
export const claimVoterRewards = async (contract) => {
  try {
    const tx = await contract.claimVoterRewards();
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in claimVoterRewards:", error);
    throw error;
  }
};

// Claim promoter rewards
export const claimPromotorRewards = async (contract, params) => {
  const { _promoCodeHash } = params;
  try {
    const tx = await contract.claimPromotorRewards(_promoCodeHash);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in claimPromotorRewards:", error);
    throw error;
  }
};

// Set Market Information
export const setMarketInfo = async (contract, params) => {
  const { _anyTicket, _category, _descr, _imgUrl } = params;
  console.log("sMIcontract--", _category);
  try {
    const tx = await contract.setMarketInfo(
      _anyTicket,
      _category,
      _descr,
      _imgUrl
    );
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in setMarketInfo:", error);
    throw error;
  }
};

// Get Market Information For Maker
export const getMarketsForMaker = async (contract, params) => {
  const { _maker, _liveAll, _idxStart, _retCnt } = params;
  console.log("gMFMcontract--", _category);
  try {
    const tx = await contract.getMarketsForMaker(
      _maker,
      _liveAll,
      _idxStart,
      _retCnt
    );
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in getMarketsForMaker:", error);
    throw error;
  }
};

// Get Market Info For Category
export const getMarketsForCategory = async (contract, params) => {
  const { _cat, _liveAll, _idxStart, _retCnt } = params;
  console.log("gMFMcontract--", _category);
  try {
    const tx = await contract.getMarketsForCategory(
      _cat,
      _liveAll,
      _idxStart,
      _retCnt
    );
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error in getMarketsForCategory:", error);
    throw error;
  }
};
