import React from 'react';
import './App.css';

export const Hand = props => {
  let cardList = props.hand

  let showCards= cardList.map(card => {
   return(
       <img alt ="card" src={card.image} key={card.code} />
   )
  })
  return (
    <>
    {showCards}
    </>
  );
};
