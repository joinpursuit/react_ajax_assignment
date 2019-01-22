import React from 'react'

const Hand = ({deckId, playerHand}) => {
  return (
    <React.Fragment>
      Deck Id: {deckId}
      Your Cards: {playerHand}

      <input type='button' value='Click me' />

  </React.Fragment>
  )
}

export default Hand
