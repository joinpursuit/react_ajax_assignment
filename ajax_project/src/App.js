import React, { Component } from 'react';
import Menu from './menu';
import Hand from './hand';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor () {
    super ()
    this.state = {
      deckId: '',
      gameOn: false,
      drawnCards: [],
      cardValueSum: 0,
      busted: false
    }
  }
  
    checkForBust = () => {
      let { cardValueSum, drawnCards, gameOn } = this.state
      
      if (gameOn) {
      drawnCards.forEach(card => {
        if (card.value === 'JACK' || card.value === 'KING' || card.value === 'QUEEN') {
          this.setState({ cardValueSum: cardValueSum + 10 })
        } else if (card.value === 'ACE' && cardValueSum > 10) {
          this.setState({ cardValueSum: cardValueSum + 1 })
        } else if (card.value === 'ACE' && cardValueSum < 10) {
          this.setState({ cardValueSum: cardValueSum + 11 })
        } else {
          let cardValueInt = parseInt(card.value)
          this.setState({ cardValueSum: cardValueSum + cardValueInt })
        }
      });
      }
      if (cardValueSum > 21) {
        this.setState({ busted: true })
      }
    }
  
  startNewGame = (event) => {
    event.preventDefault();
    axios
    .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => {
      this.setState({
        deckId: response.data.deck_id,
        gameOn: true
      })
        axios
        .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`)
        .then(response => {
        this.setState({
          drawnCards: response.data.cards
        })
        })
    })
    .catch(err => {
      console.log('Error fetching cards!')
    })
  };

  joinExistingGame = (event) => {
    event.preventDefault();
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`)
    .then(response => {
      this.setState({
        gameOn: true,
        drawnCards: response.data.cards
      })
      this.checkForBust();
    })
    .catch(err => {
      console.log('Error fetching cards!')
    })
  };

  hitMe = (event) => {
    event.preventDefault();
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
    .then(response => {
      let newCards = this.state.drawnCards;
      newCards.push(response.data.cards[0])
      this.setState({
        drawnCards: newCards
      })
      this.checkForBust();
    })
    .catch(err => {
      console.log('Error fetching cards!')
    })
  };

  handleSelectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  
  render () {
      const { deckId, gameOn, drawnCards } = this.state;
    if (gameOn) {
      return (
        <React.Fragment>
        <h1>Blackjack</h1>
        <Hand 
        deckId={ deckId }
        gameOn={ gameOn }
        drawnCards={ drawnCards }
        hitMe={ this.hitMe }
        />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
        <h1>Blackjack</h1>
        <Menu 
        deckId={ deckId }
        gameOn={ gameOn }
        drawnCards={ drawnCards }
        handleSelectChange={ this.handleSelectChange }
        joinExistingGame={ this.joinExistingGame }
        startNewGame={ this.startNewGame }
        />
        </React.Fragment>
      )
    }
  }
}

export default App; 