import React from "react";
import styled from "styled-components";

export default function CreateAndSell() { 

  const data = [
    {
      title: "Get the coolest NFT's 100% guaranteed",
      description:
        "Only cool collectibles are.",
      buttonText: "Marketplace",
    },
    {
      title: "¿ Got your hands on some rare cool NFT ? Sell it! ",
      description:
        "Sell your rare and/or cool NFT and get some ETH!",
      buttonText: "Sell",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>
          Create and Sell Your
          <i style={{ fontWeight: "900", color: "aquamarine" }}>cool</i> NFTs
        </h2>
      </div>
      <div className="container">
        <div className="ellipse"></div>
        <div className="content">
          {data.map(({ image, title, description, buttonText }, index) => {
            return (
              <div className="createAndSell" key={index}>
     
                <h3>{title}</h3>
                <p>{description}</p>

                <a href={buttonText.toLowerCase()}>
                  {" "}
                  <button className="button">{buttonText}</button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 0 6rem;
  margin-bottom: 5rem;
  .title {
    text-align: center;
    h2 {
      font-size: 3rem;
      color: #240b36;
      margin-bottom: 4rem;
    }
  }
  .container {
    background-color: #240b36;
    padding: 5rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    .ellipse {
      height: 30rem;
      width: 30rem;
      background-color: #f2a359;
      border-radius: 100%;
      filter: blur(2000px);
      opacity: 0.5;
      position: absolute;
      bottom: -30%;
      left: -10%;
      z-index: 1;
    }
    .content {
      display: flex;
      justify-content: space-evenly;
      gap: 3rem;
      a {
        text-decoration: none;  
      }
      .createAndSell {
        background-color: #f2a359;
        z-index: 10;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        border-radius: 1rem;
        .image {
          background-color: #240b36;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          width: max-content;
          border-radius: 2rem;
          img {
            height: 2rem;
          }
        }
        h3 {
          color: #240b36;
          font-size: 1.4rem;
        }
        p {
          color: #240b36;
          font-size: 1.2rem;
          margin-bottom: 1rem;
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
          color: #f2a359;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 2rem;
    .title {
      h2 {
        font-size: 2rem;
      }
    }
    .container {
      padding: 1rem;
      .content {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;
