import React from "react";

export const Hand = ({
  deck_id,
  cardsArr,
  hit,
  remaining,
  draw,
  resetForm,
  setScore,
  displayCards
}) => {
  return (
    <>
      <div className="cardInfo">
        <p>Remaining Cards: {remaining}</p>
        <p> Deck ID: {deck_id}</p>
        <p> Your Score: {setScore()}</p>
      </div>
      {Number(remaining) === 0 ? (
        <div>
          <p className="alert">There Are No Remaining Cards In This Deck</p>
          <button
            onClick={() => {
              resetForm();
              hit();
            }}
          >
            Play Again?
          </button>
          <div className="cardsDiv">{displayCards()}</div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              hit();
            }}
          >
            Hit Me!
          </button>
          <div className="cardsDiv">{displayCards()}</div>
        </div>
      )}
    </>
  );
};
