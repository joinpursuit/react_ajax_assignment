import React from "react";

export const Hand = ({ deck_id, cardsArr, hit, remaining }) => {
  const displayCards = () => {
    let display = [];
    cardsArr.forEach(card => {
      display.push(<img className="singleCard" src={card.image} alt="" />);
    });
    return display;
  };

  return (
    <>
      <div className="cardInfo">
        <p>Remaining Cards: {remaining}</p>
        <p> Deck ID: {deck_id}</p>
      </div>
      <button onClick={hit}>Hit Me!</button>
      <div className="cardsDiv">{displayCards()}</div>
    </>
  );
};
