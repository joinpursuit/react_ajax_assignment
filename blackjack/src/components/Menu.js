import React from 'react'

const Menu = (props) => {
    return (
      <React.Fragment>
        <h1>Blackjack</h1>
        <input type='button' value='Generate New Deck' onClick={props.handleNewGame}/>
        <input type='text' name='deckId' inputId={props.id} value={props.deckId} onChange={props.handleChange} placeholder='Deck ID'/>
        <input type='button' value='Join Existing Game' onClick={props.handleJoinGame}/>
      </React.Fragment>
    )
//line 264 and 267 Forms - input text tag.
}


export default Menu
