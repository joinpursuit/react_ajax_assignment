import React from 'react'

export const Hand = ({deckId, imgURL, cardsDrawn, handleHome, handleHitMe}) => {
  return (
    <React.Fragment>
      <h1>Blackjack</h1>
      DECK ID: {deckId}
      YOUR CARDS: {cardsDrawn}

      <input type='button'onClick={handleHitMe} value='Hit me'/>
      <input type='button' onClick={handleHome} value='Home'/>
      {imgURL}

    </React.Fragment>
  )
}
