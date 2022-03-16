import axios from "axios";

export const getETHPrice = async () => { 

    await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum")
    .then( function(response) {
          const res = response.data[0];
          const ethPrice = res.current_price;
          return parseFloat(parseFloat(ethPrice).toFixed(2));
        }
    )
    .catch( function(error ) {
        console.log(error)
        }
    )
}

export const getWEIPriceInUSD = (usd: any, wei: any) => {
    return (convertWeiToETH(wei) * usd).toFixed(2);
  };
  export const getETHPriceInUSD = (usd: any, eth: any) => {
    return (eth * usd).toFixed(2);
  };

export const convertWeiToETH = (wei: any) => {
    return parseFloat(wei) / 1000000000000000000;
  };