import React, { Component } from 'react';

const Hand = ({ deckId, drawnCards, hitMe, cardValueSum, resetGame }) => {
    let cards = drawnCards.map(card => {
        return (
            <img alt='' src={ card.images.png }/>
        )
    })
    if (cardValueSum > 21) {
        return (
            <React.Fragment>
                <h1 className='busted'>You busted!</h1>
                <p>Deck ID: { deckId }</p>
                <h2 className='score'>Score: { cardValueSum }</h2>
                { cards }
                <div className='resetButton'>
                <button className='reset' onClick={ resetGame } type='button'>Back to Menu</button>
                </div>
            </React.Fragment>
        )
    } else if (cardValueSum === 21) {
        return (
            <React.Fragment>
                <h1 className='blackjack'>You got 21!</h1>
                <p>Deck ID: { deckId }</p>
                <h2 className='score'>Score:{ cardValueSum }</h2>
                { cards }
                <div className='resetButton'>
                <button className='reset' onClick={ resetGame } type='button'>Back to Menu</button>
                </div>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Deck ID: { deckId }</p>
                <h2 className='score'>Score:{ cardValueSum }</h2>
                { cards }
                <div>
                <button className='hitme' onClick={ hitMe } type='button'>Hit Me!</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Hand;