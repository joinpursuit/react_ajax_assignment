import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
// import Menu  from './menu.js'
// import Hand from './hand.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      // playerHand: [],
      deckId: '',
      drawCard: '',
      currentDeck: []
    }
  }

  handleDraw = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCardDeck = () => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        this.setState({
          deckId: response.data.deckId
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDrawCard = () => {
    axios
      .get('https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2')
      .then(response => {
        let cardData = response.data.drawCard
        let newDeck = this.state.currentDeck;
        for(let i = 0; i < cardData.length; i++) {
          newDeck.push(cardData[i].image)
        }
        this.setState({
          drawCard: cardData,
          currentDeck: newDeck
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  displayCurrentDeckOfCards = () => {
    let currentDeck = this.state.currentDeck;
    return currentDeck.map(url => {
      return <img alt='cards' src={url}></img>
    })
  }



  render() {

    const { deckId, drawCard } = this.state

    if(!drawCard) {
      return (
        <div>
          <h1>Blackjack</h1>
          <button onClick={this.handleCardDeck}>Generate Deck</button>
          <input type='text' name='deckId' value={deckId} placeholder='Type existing Id' onChange={this.handleDraw} />
          <button onClick={this.handleDrawCard}>Draw!</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Blackjack</h1>
          <p> Deck id: {deckId}</p>
          <div>
          
            {this.displayCurrentDeckOfCards()}
            <button onClick={this.handleDrawCard}>Hit Me!</button>

            </div>
        </div>
      )
    }
  }
}

export default App;



// const { gameStart } = this.state
// if(gameStart) {
// return(
//     <div>
//       <Hand />
//     </div>
//   )
//
// } else {
//   return (
//     <div>
//       <Menu deckId={this.state.deckId} playerHand={this.state.playerHand} handleDraw={this.handleDraw} />
//     </div>
//   )
// }
