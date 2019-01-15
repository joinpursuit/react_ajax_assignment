import React, { Component } from 'react';

const Hand = ({ deckId, drawnCards, hitMe, checkForBust }) => {
    let cards = drawnCards.map(card => {
        return (
            <img alt='' src={ card.images.png }/>
        )
    })

    return (
        <React.Fragment>
            
            <p>Deck ID: { deckId }</p>
            { cards }
            <div>
            <button className='hitme' onClick={ hitMe } type='button'>Hit Me!</button>
            </div>
        </React.Fragment>
    )
}

export default Hand;