import web3 from "../components/Connector";
import contractABI from "../pages/abi/CallitFactory.abi.json";

const contractAddress = "0xYourContractAddress"; // Replace with your contract's address
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const makeNewMarket = async (fromAddress, marketParams) => {
  try {
    return await contract.methods
      .makeNewMarket(marketParams)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in makeNewMarket:", error);
    throw error;
  }
};

export const buyCallTicketWithPromoCode = async (fromAddress, promoCode) => {
  try {
    return await contract.methods
      .buyCallTicketWithPromoCode(promoCode)
      .send({ from: fromAddress });
  } catch (error) {
    console.error("Error in buyCallTicketWithPromoCode:", error);
    throw error;
  }
};
