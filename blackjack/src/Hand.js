import React from 'react'

const Hand = (props) => {
  const thisHand = props.deck.map(response => {
    return <img key={response.remaining} src={response.image} alt=" "/>
  })

  return (
    <div>
      {thisHand}
      <button onClick={props.draw}>Hit Me!</button>
    </div>
  )
}

export default Hand
