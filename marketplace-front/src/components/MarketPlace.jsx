import React, { useEffect, useState } from "react";
import { getTokenContract, getOrdersContract } from "../services/Services";
import { deleteOrder } from "../services/Services";
import { getOrders } from "../services/Services";
import { Marketplace } from "../web3/provider";
import { FaEthereum } from "react-icons/fa";
import PopUp from "./Loader";
import styled from "styled-components";

const defaultLoader = {
  type: "Processing Buy order.",
  message: "Please wait while processing the request.",
};

export default function CardNFT() {
  const [orders, setOrders] = useState([]);
  const [providerMarket, setProviderMarket] = useState();
  const [isOnBuy, setOnBuy] = useState();

  const [popup, setPopUp] = useState(defaultLoader);

  useEffect(() => {
    const init = async () => {
      const marketContract = await getOrdersContract();
      const providerMarket = new Marketplace(marketContract);
      const orders = await getOrders();
      setProviderMarket(providerMarket);
      setOrders(orders.result);
    };
    init();
  }, []);

  const onBuy = async (e, amount) => {
    try {
      setOnBuy(true);
      const id = e.target.id;
      const token = await getTokenContract();
      const idToken = await providerMarket.buyItem(id, amount, token.address);
      const result = await deleteOrder({ idToken });
      setPopUp({
        type: "Token Purchased!",
        message:
          "Congrats, you bought a new NFT,it would soon appear in your collecion.",
        buttonText: "Close",
      });
      return result;
    } catch (error) {
      setPopUp({
        type: "Error while trying to buy the NFT",
        message: "If the order is still on the marketplace, try again later.",
        buttonText: "Close",
      });
      throw new Error("No se pudo comprar" + error);
    }
  };

  return (
    <Section>
      {!isOnBuy ? (
        <div className="content">
          <h2>
            We know they are{" "}
            <i style={{ fontWeight: "900", color: "aquamarine" }}>cool</i>
          </h2>
          <h4>¡Get them before they are gone!</h4>
          <div className="marketPlaces">
            {orders.map(({ imgUrl, name, id, rarity, amount }, index) => {
              return (
                <div className="cardNFT" key={index}>
                  <div className="image">
                    <h3>Token ID: {id}</h3>
                    <div
                      className="img"
                      style={{
                        background: `url(${imgUrl})`,
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

                  <div className="price-container">
                    <FaEthereum />
                    <div className="price">{amount}</div>
                  </div>

                  <button
                    className="buy"
                    id={id}
                    disabled={isOnBuy}
                    onClick={(e) => onBuy(e, amount)}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <PopUp
          type={popup.type}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() => {
            setOnBuy(false);
            setPopUp(defaultLoader);
          }}
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
  h4 {
    color: #240b36;
    font-size: 2.2rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    color: #240b36;
    button {
      width: fit-content;
      min-width: 180px;
      border: 2px solid black;
      padding: 1rem;
      border-radius: 18px;
      display: inline-block;
      cursor: pointer;
      font-size: 18px;
      background-color: #240b36;
      color: white;
      text-align: center;
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
            text-align: center;
            margin-bottom: 0.5rem;
          }
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
          display: flex;
          padding: 0.8rem 1rem;
          align-items: center;
          justify-content: space-between;
          color: #240b36;
          .price {
            font-size: 22px;
            font-weight: 600;
            border: none;
          }
        }
        .buy {
          align-self: center;
          margin-bottom: 0.8rem;
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
