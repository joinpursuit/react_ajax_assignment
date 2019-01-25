import React from 'react'

const Menu = (props) => {
  return (
    <div>
      <h1>BlackJack!</h1>
      <button onClick={props.newDeck}>Generate Deck</button>
      Current Deck: {" "}
      {props.deckId}
      <br />
      input this deck <input type='text'  />
      <button>Draw</button>
    </div>
  )
}

export default Menu
