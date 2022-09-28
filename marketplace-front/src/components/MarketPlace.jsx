import { useState, useEffect } from "react";
import {
  DefaultLoaderMarket,
  DefaultBuySuccess,
  DefaultBuyError,
} from "../data";
import Popup from "./popup";
import { FaEthereum } from "react-icons/fa";
import "../styles/marketplace.scss";
import {
  getOrdersContract,
  getTokenContract,
  getOrders,
  deleteOrder,
} from "../services/api-services";
import { Marketplace as Market } from "../web3/provider";

export default function Marketplace() {
  const [orders, setOrders] = useState([]);
  const [providerMarket, setProviderMarket] = useState();

  const [isOnBuy, setOnBuy] = useState(false);

  const [popup, setPopUp] = useState(DefaultLoaderMarket);

  useEffect(() => {
    const _init = async () => {
      const marketContract = await getOrdersContract();
      const providerMarket = new Market(marketContract);
      setProviderMarket(providerMarket);
      const orders = await getOrders();
      setOrders(orders.result);
    };
    _init();
  }, []);


  const onBuy = async (e, amount) => {
    try {
      setOnBuy(true);
      const id = e.target.id;
      const token = await getTokenContract();
      const receipt = await providerMarket.buyItem(id, amount, token.address);
      const idToken = receipt.events.ItemBought.returnValues.tokenId;
      const result = await deleteOrder({ idToken });
      setPopUp(DefaultBuySuccess);
      return result;
    } catch (error) {
      setPopUp(DefaultBuyError);
      throw new Error("No se pudo comprar" + error);
    }
  };

  return (
    <section className="Marketplace">
      {!isOnBuy ? (
        <div className="content">
          <h2>
            We know they are <i>cool</i>
          </h2>
          <h4>¡Get them before they are all gone!</h4>
          <div className="container">
            {orders.map(({ imgUrl, name, id, rarity, amount }, index) => {
              return (
                <div className="cardNFT" key={index}>
                  <div className="image">
                    <h3>Token ID: {id}</h3>
                    <div
                      className="img"
                      style={{
                        background: `url(${imgUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
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
                    onClick={(e) => {
                      onBuy(e, amount);
                    }}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Popup
          type={popup.type}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() => {
            setOnBuy(false);
            setPopUp(DefaultLoaderMarket);
          }}
        />
      )}
    </section>
  );
}
