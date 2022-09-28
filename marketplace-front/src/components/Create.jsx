import React, { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import "../styles/create.scss";
import {
  DefaultLoaderCreateOwner,
  DefaultLoaderCreate,
  DefaultCreateSuccess,
  DefaultCreateError,
} from "../data";
import Popup from "./popup";
import { NFT } from "../web3/provider";
import ipfsHelper from "../services/pinata";
import { createNft, getTokenContract } from "../services/api-services";

export default function Create() {
  const [data, setData] = useState({
    image:
      "https://images-platform.99static.com/pULAgn-AED8QzzPGS40V0GCDOEk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/130/130378/attachment_130378088",
    name: "Mi NFT",
  });

  const [isOnCreate, setOnCreate] = useState(false);
  // TODO: Set owner to contract owner on load.
  const [isOwner, setIsOwner] = useState(false);
  const [popup, setPopUp] = useState(DefaultLoaderCreateOwner);
  const [providerNft, setProviderNft] = useState();

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    const dataClone = structuredClone(data);
    dataClone[name] = value;
    setData(dataClone);
  };

  const onCreate = async (e) => {
    console.log("ON CREATE", e);
    setPopUp(DefaultLoaderCreate);
    try {
      setOnCreate(true);
      const tokenUri = await ipfsHelper(data);
      const uri = `https://ipfs.io/ipfs/${tokenUri.IpfsHash}`;
      const { name, rarity, image } = data;
      const receipt = await providerNft.mint(uri);
      const id = receipt.events.Transfer.returnValues.tokenId;
      console.log('ID', id);
      const result = await createNft({
        name: name,
        imgUrl: image,
        rarity: rarity,
        id: id,
      });
      console.log('RESULT', result);
      setPopUp(DefaultCreateSuccess);
      return result;
    } catch (error) {
      setPopUp(DefaultCreateError);
      throw new Error("El NFT no se ha creado " + error);
    }
  };

  useEffect(() => {
    async function _init() {
      const contract = await getTokenContract();
      console.log("NFT contract", contract);
      const providerNft = new NFT(contract);
      setProviderNft(providerNft);
      const isOwner = await providerNft.isOwner();
      setIsOwner(isOwner);
    }
    _init();
  }, []);
  
  return (
    <section className="Create">
      {!isOnCreate ? (
        <div className="content">
          <h2>
            Only if you are the NFT contract owner, using this section is
            posible.
          </h2>
          {!isOwner ? (
            <Popup
              type={popup.type}
              message={popup.message}
              redirect={popup.redirect}
              redirectUrl={popup.redirectUrl}
              redirectText={popup.redirectText}
            />
          ) : (
            <div className="create">
              <div className="image">
                <img src={data.image} alt="chose" />
              </div>
              <div className="form">
                <label className="label">NFT Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  className="input"
                />
                <label className="label">Rarity: 1 to 10</label>
                <input
                  type="number"
                  max="10"
                  min="1"
                  name="rarity"
                  value={data.rarity}
                  onChange={onChange}
                  className="input"
                />
                <label className="label">Image Url</label>
                <input
                  type="text"
                  name="image"
                  value={data.image}
                  onChange={onChange}
                  className="input"
                />
                <button
                  className="button"
                  onClick={onCreate}
                  disabled={isOnCreate}
                >
                  Crear NFT
                </button>
              </div>
              <div className="preview">
                <h4>Preview</h4>
                <div className="cardNFT">
                  <div className="image">
                    <h3>
                      {" "}
                      Token ID: <i>Unknown</i>
                    </h3>
                    <img src={data.image} alt="choose" />
                  </div>
                  <div className="name">
                    <h4>{data.name}</h4>
                    <h4>
                      <i>rarity {data.rarity}</i>
                    </h4>
                  </div>

                  <div className="price-container">
                    <FaEthereum />
                    <div className="price">
                      <i>price in ETH</i>
                    </div>
                  </div>

                  <button className="buy">Buy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Popup
          type={popup.title}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() => {
            setOnCreate(false);
            setPopUp(DefaultLoaderCreateOwner);
          }}
        />
      )}
    </section>
  );
}
