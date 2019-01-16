import React from "react";

export const Endgame = ({
  deck_id,
  cardsArr,
  hit,
  remaining,
  draw,
  resetForm,
  setScore
}) => {
  return (
    <div className="cardInfo">
      <p>Remaining Cards: {remaining}</p>
      <p> Deck ID: {deck_id}</p>
      <p> Your Score: {setScore()}</p>
    </div>
  );
};
