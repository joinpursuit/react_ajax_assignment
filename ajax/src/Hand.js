import React from "react";

const Hand = props => {
  let hand = props.cards.map(res => {
    return <img src={res.image} alt="" />;
  });
  return (
    <>
      {hand}
      <button onClick={props.hit}>Hit</button>
    </>
  );
};

export default Hand;
