import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopUp from "./Loader";
import { NFT, Marketplace } from "../web3/provider";
import { FaEthereum } from "react-icons/fa";
import { createOrder } from "../services/Services";
import { getTokenContract, getOrdersContract } from "../services/Services";
var axios = require("axios");

// TODO : https://www.youtube.com/watch?v=Wa54QCDrZ9Q // 14:02.
export default function Profile() {
  const [data, setData] = useState({});
  const [providerNft, setProviderNft] = useState();
  const [providerMarket, setProviderMarket] = useState();
  const [isOnSell, setOnSell] = useState();
  const [myNfts, setMyNfts] = useState([]);

  const defaultLoader = {
    type: "Processing Sell order.",
    message: "Please wait while processing the request.",
  };

  const [popup, setPopUp] = useState(defaultLoader);
  const fetch = async (tokenMetadataURI) => {
    var config = {
      method: "get",
      url: tokenMetadataURI,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    return response.data;
  };

  useEffect(() => {
    async function _init() {
      const nftContract = await getTokenContract();
      const marketContract = await getOrdersContract();

      const providerNft = new NFT(nftContract);
      const providerMarket = new Marketplace(marketContract);

      setProviderNft(providerNft);
      setProviderMarket(providerMarket);

      await loadNfts(providerNft);
    }

    const loadNfts = async (providerNft) => {
      const balance = await providerNft.balanceOf();
      const clone = structuredClone(myNfts);

      for (let i = 0; i < balance; i++) {

        const id = await providerNft.tokenOfOwnerByIndex(i);
        let tokenMetadataURI = await providerNft.tokenURI(id);

        if (tokenMetadataURI) {
          const data = await fetch(tokenMetadataURI);
          data.id = id;

          const notRepeated =
            clone.filter((e) => e.id === data.id).length === 0;
          if (notRepeated) clone.push(data);

        }
      }
      setMyNfts(clone);
    };

    _init();
  }, []);

  const onSale = async (e) => {
    try {
      setOnSell(true);
      const id = e.target.id;
      const nft = await getTokenContract();
      const market= await getOrdersContract();

      await providerNft.approve(market.address, id);
      await providerMarket.listItem(id, data[id].price, nft.address);
      const result = await createOrder({
        idToken: id,
        amount: data[id].price,
      });

      setPopUp({
        type: "The order was created!",
        message: "Your order should be listed on the marketplace soon.",
        buttonText: "Close",
      });

      return result;

    } catch (error) {
      setPopUp({
        type: "Error while trying to create the order",
        message: "If your order is not on the marketplace, try again later.",
        buttonText: "Close",
      });
      throw new Error("Fallo en la venta" + error);
    }
  };

  const onChange = (e) => {

    const { name, value, id } = e.currentTarget;
    const dataClone = structuredClone(data);
    var entry = {};
    entry[name] = value;
    dataClone[id] = entry;
    // dataClone[id][name] = value;
    setData(dataClone);
  };

  const onProceeds = async() => {
    try {
      setPopUp({
        type: "Withdrawing proceeds from your Market sales!",
        message: "Geting all your profits from NFT sales...",
      });
      setOnSell(true);
      const result = await providerMarket.withdrawProceeds();
      setPopUp({
        type: "Proceeds withdrowed, check your wallet balance!",
        message: "If you did not get proceeds, your NFT might still on sale.",
        buttonText: "Close",
      });
      return result;
    } catch (error) {
      setPopUp({
        type: "Error while trying to withdraw proceeds",
        message: "If you are sure you own proceeds, try again later.",
        buttonText: "Close",
      });
    }

  };

  return (
    <Section>
      {!isOnSell ? (
        <div className="content">
          <h2>
            All your{" "}
            <i style={{ fontWeight: "900", color: "aquamarine" }}>cool</i>{" "}
            Collectibles here !
          </h2>
          <button className="proceeds" onClick={onProceeds}>
            Get Proceeds
          </button>
          <div className="marketPlaces">
            {myNfts.length > 0 ? (
              <>
                {myNfts.map(({ image, name, id, rarity }, index) => {
                  return (
                    <div className="cardNFT" key={index}>
                      <div className="image">
                        <h3>Token ID: {id}</h3>
                        <div
                          className="img"
                          style={{
                            background: `url(${image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                          alt="cardNFT"
                        ></div>
                      </div>
                      <div className="name">
                        <h4>{name}</h4>
                        <h4>
                          <i>rarity {rarity}</i>
                        </h4>
                      </div>
                      {/* <div className="price-container">
                  <h5 className="price">5.5ETH</h5>
                  <FaEthereum />
                </div> */}
                      <div className="price-container">
                        <FaEthereum />
                        <input
                          type="number"
                          name="price"
                          id={id}
                          placeholder="Set your ETH price."
                          // value={data.id.price}
                          onChange={onChange}
                          className="input"
                        />
                      </div>
                      <button
                        className="sell"
                        id={id}
                        onClick={onSale}
                        disabled={isOnSell}
                      >
                        Sell
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h2>
                  Loading your{" "}
                  <i style={{ fontWeight: "900", color: "aquamarine" }}>cool</i>{" "}
                  Collectibles...
                </h2>
              </>
            )}
          </div>
        </div>
      ) : (
        <PopUp
          type={popup.type}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() =>{setOnSell(false); setPopUp(defaultLoader)}}
        />
      )}
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 9rem;
  gap: 3rem;
  margin-bottom: 5rem;
  h2 {
    color: #240b36;
    font-size: 4rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    .proceeds {
      font-size: 2rem;
      font-weight: 600;
      height: 4rem;
      width: fit-content;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
    }
    button {
      margin-top: 0.8rem;
      height: 2rem;
      width: fit-content;
      min-width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4rem;
      padding: 0.8rem 2rem;
      border: none;
      color: white;
      font-size: 1.1rem;
      cursor: pointer;
      background-color: #240b36;
      color: white;
    }
    .marketPlaces {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      .cardNFT {
        display: flex;
        flex-direction: column;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 0.5rem;
        border-radius: 1rem;
        align-items: space-evenly;
        width: max-content;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }
        .image {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          .img {
            border-radius: 1rem;
            width: 320px;
            height: 380px;
          }
          h3 {
            color: #240b36;
            text-align: center;
            margin-bottom: 0.5rem;
          }
        }
        .name {
          display: flex;
          color: #240b36;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          h4 {
            color: #240b36;
          }
        }
        .username {
          color: #555555;
          font-size: 0.8rem;
          padding: 0 1rem;
          margin-bottom: 0.5rem;
        }
        .price-container {
          display: flex;
          padding: 0.8rem 1rem;
          align-items: center;
          justify-content: space-between;
          color: #240b36;
          input {
            font-size: 18px;
            border: none;
            color: #240b36;
          }
        }
        .sell {
          align-self: center;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    margin: 2rem;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50vw;
      }
    }
    .content {
      gap: 1rem;
      h2 {
        font-size: 1rem;
      }
      .cardNFT {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 0.5rem;
        border-radius: 1rem;
        width: max-content;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }
        .image {
          margin-bottom: 1rem;
        }
        .name {
          display: flex;
          color: #222222;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          h4 {
          }
        }
        .username {
          color: #555555;
          font-size: 0.8rem;
          padding: 0 1rem;
          margin-bottom: 0.5rem;
        }
        .price-container {
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          color: #02204e;
        }
      }
    }
  }
`;
