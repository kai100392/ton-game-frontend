const refAddr = "0xc4D502Bb6D8Cd3a9150470543dE9781BA5869cB1";

export const getPricePercentDataFromDex = async (tokenAddresses) => {
  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`,
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();
  console.log("dex query...", tokenAddresses);
  console.log("dex response...", data);
  if (data.pairs == null) return null;
  return data.pairs[0].priceUsd;
};
