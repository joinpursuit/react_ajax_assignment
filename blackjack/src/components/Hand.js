import React from 'react'

export const Hand = ({deckId, imgURL, cardsDrawn, cardsRemaining, handleHome, handleHitMe}) => {
  return (
    <React.Fragment>
      <div className='titleBlackjack'>
        <h1>Blackjack</h1>
      </div>
      <div className='handPTags'>
        <p>DECK ID: {deckId} </p>
        <p>CARDS REMAINING: {cardsRemaining} </p>
      </div>
      <div className='handButtonsDiv'>
        <input className='handButtons' type='button'onClick={handleHitMe} value='Hit me'/>
        <input className='handButtons' type='button' onClick={handleHome} value='Home'/>
      </div>
      <div className='handCardDisplay'>
        {imgURL}
      </div>

    </React.Fragment>
  )
}
