export const getPricePercentDataFromDex = async (tokenAddresses) => {
  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`,
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();
  console.log("dex response...", data);
};
