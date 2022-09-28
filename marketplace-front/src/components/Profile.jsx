import { useState, useEffect } from "react";
import Popup from "./popup";
import {
  DefaultLoaderSell,
  DefaultSaleSuccess,
  DefaultSaleError,
  DefaultLoaderProceeds,
  DefaultProceedsSuccess,
  DefaultProceedsError,
} from "../data";
import { FaEthereum } from "react-icons/fa";
import "../styles/profile.scss";
import axios from "axios";
import {
  getTokenContract,
  getOrdersContract,
  createOrder,
} from "../services/api-services";
import {NFT, Marketplace} from '../web3/provider';

export default function Profile() {
  const [data, setData] = useState({});
  const [myNfts, setMyNfts] = useState([]);
  const [isOnSell, setOnSell] = useState(false);
  const [popup, setPopUp] = useState(DefaultLoaderSell);

  const [providerNft, setProviderNft] = useState(false);
  const [providerMarket, setProviderMarket] = useState(false);

  const onChange = (e) => {
    const { name, value, id } = e.currentTarget;
    console.log("ON CHANGE", name, value, id);
    const clone = structuredClone(data);
    let entry = {};
    entry[name] = value;
    clone[id] = entry;
    setData(clone);
  };

  const onSale = async (e) => {
    try {
      setOnSell(true);
      const id = e.target.id;
      const nft = await getTokenContract();
      const market = await getOrdersContract();

      await providerNft.approve(market.address, id);
      await providerMarket.listItem(id, data[id].price, nft.address);

      const result = await createOrder({
        idToken: id,
        amount: data[id].price,
      });

      setPopUp(DefaultSaleSuccess);
      return result;
    } catch (error) {
      setPopUp(DefaultSaleError);
      throw new Error("Fallo en la orden de venta" + error);
    }
  };

  const onProceeds = async () => {
    try {
      setPopUp(DefaultLoaderProceeds);
      setOnSell(true);
      const result = await providerMarket.withdrawProceeds();
      setPopUp(DefaultProceedsSuccess);
      return result;
    } catch (error) {
      setPopUp(DefaultProceedsError);
      throw new Error("Error al reclamar fondos" +error);
    }
  };

  const fetch = async (tokenMetadataURI) => {
    var config = {
      method: "get",
      url: tokenMetadataURI,
      Headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log('FETCH RESPONSE', response);
    return response.data;
  };

    const loadNfts = async (providerNft) => {
      // Obtener cantidad de NFT's que pertenecen a un address.
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
    _init();
  });

  return (
    <section className="Profile">
      {!isOnSell ? (
        <div className="content">
          <h2>
            {" "}
            All your <i>cool</i> collectibles here!
          </h2>
          <button className="proceeds" onClick={onProceeds}>
            Get proceeds
          </button>
          <div className="collection">
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
                        <input
                          type="number"
                          name="price"
                          id={id}
                          placeholder="Price in ETH."
                          // value={data.id.price}
                          onChange={onChange}
                          className="input"
                        />
                      </div>

                      <button
                        className="sell"
                        id={id}
                        disabled={isOnSell}
                        onClick={onSale}
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
                  {" "}
                  Loading your <i> cool</i> collectibles...{" "}
                </h2>
              </>
            )}
          </div>
        </div>
      ) : (
        <Popup
          type={popup.type}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() => {
            setOnSell(false);
            setPopUp(DefaultLoaderSell);
          }}
        />
      )}
    </section>
  );
}
