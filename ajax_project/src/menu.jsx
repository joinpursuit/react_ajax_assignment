import React, { Component } from 'react';


const Menu = ({ deckId, handleSelectChange, joinExistingGame, startNewGame }) => {
   return (
       <React.Fragment>

           <h2>Menu</h2>

           <div className='newGame'>
            <h4>Create new game</h4>
            <button id='newDeck' type='button' onClick={ startNewGame }>New game</button>
           </div>

           <div className='joinGame'>
            <h4>Join existing game</h4>
            <input type='text' name='deckId' onChange={ handleSelectChange } value={ deckId } placeholder='Existing deck ID' />
            <button id='existingDeck' onClick={ joinExistingGame } type='button'>Join game</button>
           </div>

       </React.Fragment>
   )
}

export default Menu;