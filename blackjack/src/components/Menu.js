import React from 'react'

const Menu = (props) => {
    return (
      <div>
        <div className='titleBlackjack'>
          <h1>Blackjack</h1>
        </div>

          <div className='menuButtonsAndInputDiv'>
            <input className= 'menuButtons' type='button' value='Generate New Deck' onClick={props.handleNewGame}/>
          </div>
          <div className='menuButtonsAndInputDiv'>
            <input className='menuInput' type='text' name='textInput' value={props.textInput} onChange={props.handleChange} placeholder='Deck ID'/>
            <input className= 'menuButtons' type='button' value='Join Existing Game' onClick={props.handleJoinGame}/>
          </div>

      </div>
    )
//line 264 and 267 Forms - input text tag.
}


export default Menu
