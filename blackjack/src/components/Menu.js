import React from 'react'

const Menu = (props) => {
    return (
      <React.Fragment>
        <h1>Blackjack</h1>
        <input type='button' value='Generate New Deck' onClick={props.handleNewGame}/>
        <input type='text' name='deckId' placeholder='Deck ID'/>
        <input type='button' value='Join Existing Game' onClick={props.handleNewGame}/>
      </React.Fragment>
    )

}


export default Menu
