import React from "react";
import styled from "styled-components";

export default function PopUp({ type, message, buttonText, onClick }) {
  return (
    <Section>
      <div className="popup">
        <h3>{type}</h3>
        <p>{message}</p>

        {buttonText && (
            <button className="button" onClick={onClick}>
              {buttonText}
            </button>
        )}
      </div>
    </Section>
  );
}

const Section = styled.section`
  background-color: #f2a359;
  z-index: 20;
  padding: 2rem;
  position: fixed;
  top: 20%;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  .popup {
    background-color: #f2a359;
    width: 60vw;
    height: 60vh;
    z-index: 10;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 2.2rem;
      color: #240b36;
    }
    p {
      font-size: 1.4rem;
      color: #240b36;
      margin-bottom: 1rem;
    }
    button {
      margin-top: 1.8rem;
      height: 3rem;
      width: fit-content;
      min-width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4rem;
      padding: 0.8rem 2rem;
      border: none;
      font-size: 2.2rem;
      cursor: pointer;
      background-color: #240b36;
      color: #f2a359;
    }
  }
`;
