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
  // if (data.pairs == null) return null;
  // return data.pairs[0].priceUsd;
  console.log("dex priceUsd...", data.pairs ? data.pairs[0].priceUsd : -1);
  return data.pairs ? data.pairs[0].priceUsd : '-1.0'
};

export const getNameSymbolDataFromDex = async (tokenAddresses) => {
  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`,
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();
  // Get the baseToken name and symbol
  
  console.log("dex query...", tokenAddresses);
  console.log("dex response...", data);
  // if (data.pairs == null) return null;
  // return data.pairs[0].priceUsd;
  const { name = '', symbol ='no-trades' } = data.pairs ? data.pairs[0].baseToken : {};
  console.log("dex name/symb...", name, symbol);
  return name + ' (' + symbol + ')'
};


