import React from 'react'

export const Hand = ({deckId, imgURL, cardsDrawn, cardsRemaining, handleHome, handleHitMe}) => {
  return (
    <React.Fragment>
      <h1>Blackjack</h1>
      DECK ID: {deckId} <br/>
      // CARDS DRAWN: {cardsDrawn}
      CARDS REMAINING: {cardsRemaining} <br/>

      <input type='button'onClick={handleHitMe} value='Hit me'/>
      <input type='button' onClick={handleHome} value='Home'/>
      <br/>
      {imgURL}

    </React.Fragment>
  )
}
