import React from 'react'

export const Hand = ({deckId, cardsDrawn, handleHome}) => {
  return (
    <React.Fragment>
      <h1>Blackjack</h1>
      DECK ID: {deckId}
      YOUR CARDS: {cardsDrawn}

      <input type='button' value='Hit me'/>
      <input type='button' value='Home' onClick={handleHome}/>
    </React.Fragment>
  )
}
