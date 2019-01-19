import React from 'react';

const Hand = props => {

  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <input 
          type='text'
          onChange={props.handleChange}
          value={props.textInput}
          placeholder='Please type in deck_id to start.'
        />
        <button type='submit'>Confirm To Join A Game</button>
      </form>
    </>
  )
}

export default Hand;