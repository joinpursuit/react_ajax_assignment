import React from 'react'

export const Hand = ({deckId, cardsDrawn}) => {
  return (
    <React.Fragment>
      <h1>Blackjack</h1>
      DECK ID: {deckId}
      YOUR CARDS: {cardsDrawn}

      <input type='button' value='Hit me'/>
    </React.Fragment>
  )
}
