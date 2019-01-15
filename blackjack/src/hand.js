import React, {Component} from 'react'


const Hand = ({deckId,drawCards,handleDrawCards,getCards,handleChange,finalCardDraw, handleOneCard, oneSingleCardDraw}) => {

  return(
    <>
    <button onClick={getCards}>Generate Deck</button>
    <br />
    {deckId}
    <br />

    <label>Input Existing Text</label>
    <input onChange={handleChange}  type="text" />
  <button onClick={handleDrawCards}>Draw</button>
    {finalCardDraw}
    {finalCardDraw.length > 1 ?
      <>
      <button onClick={handleOneCard}>Hit me</button>
  {oneSingleCardDraw}
  </> : ""}

    </>
  )

}

export default Hand;

// <button onClick={handleDrawCards}>Draw</button>
// const MyCards = ({ handleCardDraw, cards }) => {
//   return (
//   	<div>
//       <button onClick={() => handleCardDraw()}>Draw A Card</button>
//       {cards.map(c => (
//       	<img src={c.image} alt='' />
//       ))}
//     </div>
//   )
// }
