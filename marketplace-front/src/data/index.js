import { client1, client2, client3, client4, client5 } from "../assets";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import {
  DefaultLoaderCreate,
  DefaultLoaderCreateOwner,
  DefaultLoaderMarket,
  DefaultLoaderSell,
  DefaultCreateSuccess, 
  DefaultCreateError,
  DefaultBuySuccess,
  DefaultBuyError,
  DefaultSaleSuccess,
  DefaultSaleError,
  DefaultLoaderProceeds,
  DefaultProceedsSuccess,
  DefaultProceedsError,
} from "./default-loaders";

const CreateAndSellData = [
  {
    title: "Get the coolest NFT's 100% guaranteed",
    description: "Only cool collectibles are.",
    buttonText: "Marketplace",
  },
  {
    title: "¿ Got your hands on some rare and/or cool NFT ? Sell it! ",
    description: "Sell your rare and/or cool NFT's ang get some ETH! ",
    buttonText: "Sell",
  },
];

const ClientData = [client1, client2, client3, client4, client5];

const servicesLinks = ["Art", "Common", "Trading", "Rare", "Generic"];
const companyLinks = ["Home", "Create", "Marketplace", "Sell", "Contact"];

const contactInfo = [
  { icon: <MdEmail />, value: "ucavMarketplace@gmail.com"},
  { icon: <MdPhoneInTalk />, value: "+(34) 666666666" },
  { icon: <IoLocationSharp />, value: "1920 Hampshire, Winchester" },
];

const socialIcons = [
  <AiFillFacebook />,
  <FaTwitterSquare />,
  <BsLinkedin />,
  <FaInstagramSquare />,
];

export {
  CreateAndSellData,
  ClientData,
  servicesLinks,
  companyLinks,
  contactInfo,
  socialIcons,
  DefaultLoaderCreateOwner,
  DefaultLoaderCreate,
  DefaultLoaderMarket,
  DefaultLoaderSell,
  DefaultCreateSuccess,
  DefaultCreateError,
  DefaultBuySuccess,
  DefaultBuyError,
  DefaultSaleSuccess,
  DefaultSaleError,
  DefaultLoaderProceeds,
  DefaultProceedsSuccess,
  DefaultProceedsError,
};
