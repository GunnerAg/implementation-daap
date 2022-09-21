import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEthereum } from "react-icons/fa";
import ipfsHelper from "../services/pinata";
import { getTokenContract } from "../services/Services";
import { NFT } from "../web3/provider";
import { createNft } from "../services/Services";
import PopUp from "./Loader";

export default function Create() {
  const [data, setData] = useState({
    image:
      "https://images-platform.99static.com/pULAgn-AED8QzzPGS40V0GCDOEk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/130/130378/attachment_130378088",
  });
  const [providertNft, setProviderNft] = useState();
  const [isOnCreate, setOnCreate] = useState();
  const defaultLoader = {
    type: "Processing Create order.",
    message: "Please wait while processing the request.",
  };
  const [popup, setPopUp] = useState(defaultLoader);

  useEffect(() => {
    async function _init() {
      const contract = await getTokenContract();
      setProviderNft(new NFT(contract));
    }
    _init();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const dataClone = structuredClone(data);
    dataClone[name] = value;
    setData(dataClone);
  };

  const onCreate = async () => {
    try {
      setOnCreate(true);
      const tokenUri = await ipfsHelper(data);
      const uri = `https://ipfs.io/ipfs/${tokenUri.IpfsHash}`;
      const { name, rarity, image } = data;
      const id = await providertNft.mint(uri);
      const result = await createNft({
        name: name,
        imgURL: image,
        rarity: rarity,
        id: id,
      });
      setPopUp({
        type: "The NFT was created!",
        message: "Your NFT should appear on your collection soon.",
        buttonText: "Close",
      });
      return result;
    } catch (error) {
      setPopUp({
        type: "Error while trying to create the NFT",
        message:
          "Please wait and try again later",
        buttonText: "Close",
      });
      throw new Error("El NFT No se ha creado" + error);
    }
  };

  return (
    <Section>
      {!isOnCreate ? (
        <div className="content">
          <h2>
            If you <i>ARE NOT</i> the owner, using this section is a waste of
            time.
          </h2>
          <h4>
            Nevertheless, if you happen to be the owner. <br />
            Create some{" "}
            <i style={{ fontWeight: "900", color: "aquamarine" }}>cool</i> NFT's
            and sell them!
          </h4>
          <div className="create">
            <div className="image">
              <img src={data.image} alt="choose" />
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

              <label className="label">Rarity (1 to 10)</label>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h4
                style={{
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                Preview
              </h4>
              <div className="cardNFT">
                <div className="image">
                  <h3>
                    Token ID: <i>Unknown</i>.
                  </h3>
                  <div className="image">
                    <img src={data.image} alt="choose" />
                  </div>
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
        </div>
      ) : (
        <PopUp
          type={popup.type}
          message={popup.message}
          buttonText={popup.buttonText}
          onClick={() =>{setOnCreate(false); setPopUp(defaultLoader)}}
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
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 3rem;
    h2 {
      color: #240b36;
      font-size: 4rem;
    }
    h4 {
      color: #240b36;
      font-size: 2.2rem;
    }
    .create {
      display: flex;
      align-items: center;
      width: 100%;
      flex-direction: row;
      justify-content: space-evenly;
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
      .image {
        margin: 1rem;
        img {
          border: solid #240b36 1px;
          border-radius: 1rem;
          width: 320px;
          height: 380px;
        }
      }
      .form {

        width: 30%;
        display: flex;
        justify-content: top;
        height: fit-content;
        align-items: center;
        flex-direction: column;
        border: solid 2px #240b36;
        border-radius: 1rem;
        padding: 2rem;
        label {
          font-size: 32px;
          font-weight: 600;
          color: #240b36;
        }
        .input {
          margin: 1rem;
          color: #240b36;
          width: 100%;
          padding: 6px 12px;
          border: #240b36 solid 2px;
          border-radius: 8px;
          font-size: 18px;
          height: 2.2rem;
        }
        .file {
          text-align: center;
          height: 32px;
        }
      }
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
          margin: 1rem;
          img {
            border: solid #240b36 1px;
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
      .form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 3rem;
      }
    }
  }
`;
