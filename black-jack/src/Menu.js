import React from "react";

export const Menu = ({ deck_id, draw, handleChange, hit, remaining, err }) => {
  return (
    <>
      <div className="cardInfo">
        <p>Remaining Cards: {remaining}</p>
        <p> Deck ID: {deck_id}</p>
      </div>
      <div className="userInput">
        <button onClick={draw}>Generate New Deck</button>
        <p>
          Input Existing Deck{" "}
          <input
            placeholder="Join a game with id"
            onChange={handleChange}
            type="text"
            value={deck_id}
            name="deck_id"
          />
          <button onClick={hit}>Draw</button>
        </p>
      </div>
      {err ? <p id="alert">Please Enter a Valid Deck ID</p> : null}
    </>
  );
};
