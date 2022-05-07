import web3 from "./web3";
import CampaignFactory from "../build/contracts/CampaignFactory.json";

const factory = new web3.eth.Contract(
    CampaignFactory.abi as any,
    "0x9c2Ff4d3FD42b75555AE11D44cCd4354812Df7C6",
);

export default factory;
