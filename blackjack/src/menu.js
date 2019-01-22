import React from 'react'

const Menu = (props) => {
  return (
    <div>
      <input type='button' value='Deck Generator' />
      <input type='text' name='deckId' placeholder = 'Deck Id' />
      <input type='button' value='draw' onClick={props.handleDraw} />
    </div>
  )
}

export default Menu
