import fetch from "node-fetch";
export const getETHPrice = async () => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum",
        );
        const data = await response.json();
        const ethPrice = data[0].current_price;
        return parseFloat(parseFloat(ethPrice).toFixed(2));
    } catch (error) {
        console.log(error);
    }
};

export const getWEIPriceInUSD = (usd: number, wei: number) => {
    const res = convertWeiToETH(wei) * parseFloat(usd);
    return res.toFixed(2);
};
export const getETHPriceInUSD = (usd: number, eth: number) => {
    const res = eth * usd;
    return res.toFixed(2);
};

export const convertWeiToETH = (wei: number) => {
    return wei / 1000000000000000000;
};
