
import React from 'react';

const Menu = props => {
  //Grab image url from cardsArr props, and assign them to varibles 
  const pics = props.cardsArr.map(card =>  <img src={card.image} alt='' />) 

  return(
    <div className='menu'>
      <button onClick={props.handleSubmit}>Generate A Deck</button><br /><br /><br />
      {pics}
    </div>
  )
}

export default Menu;