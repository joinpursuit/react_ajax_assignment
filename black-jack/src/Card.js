import React from "react";

export const Card = ({ card }) => {
  return (
    <React.Fragment>
      <img className="cardImg" src={card.image} alt="card" />
    </React.Fragment>
  );
};
