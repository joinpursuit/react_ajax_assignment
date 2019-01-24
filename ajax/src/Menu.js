import React from "react";

const Menu = props => {
  return (
    <div>
      <h1>BlackJack</h1>
      <br />
      <button onClick={props.newDeck}>Generate Deck</button> Current Deck:{" "}
      {props.deckId}
      <br />
      input existing deck <input type="text" value="" />
      <button>Draw</button>
    </div>
  );
};

export default Menu;
