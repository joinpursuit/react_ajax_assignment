import React from 'react';

const Menu = (props) => {
  return props.cardsArr.map(card => {
    return (
      <>
        <img src={card.image} alt=''></img>
      </>
    )
  })
}

export default Menu;