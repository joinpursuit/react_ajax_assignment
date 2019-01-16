import React from "react";

export const Menu = ({
  deck_id,
  draw,
  handleChange,
  hit,
  remaining,
  err,
  cardsArr,
  pressClick,
  setScore
}) => {
  return (
    <>
      {cardsArr.length ? (
        <div className="cardInfo">
          <p>Remaining Cards: {remaining}</p>
          <p> Deck ID: {deck_id}</p>
          <p> Your Score: {setScore()}</p>
        </div>
      ) : null}
      <div className="userInput">
        <button
          onClick={() => {
            draw();
          }}
        >
          Generate New Deck
        </button>
        <p>
          Input Existing Deck{" "}
          <input
            placeholder="Join a Game With Deck ID"
            onChange={handleChange}
            type="text"
            value={deck_id}
            name="deck_id"
            onKeyPress={pressClick}
          />
          <button onClick={hit}>Draw</button>
        </p>
      </div>
      {err ? <p className="alert">Please Enter a Valid Deck ID</p> : null}
    </>
  );
};
