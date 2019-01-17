import React from 'react'

const Menu = (props) => {
    return (
      <React.Fragment>
        <h1>Blackjack</h1>
        <input type='button' value='Generate New Deck' onClick={props.handleDraw}/>
        <input type='text' name='deckId' placeholder='Deck ID'/>
        <input type='button' value='Join Existing Game' onClick={props.handleDraw}/>
      </React.Fragment>
    )

}


export default Menu
