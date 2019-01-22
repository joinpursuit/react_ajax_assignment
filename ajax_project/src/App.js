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
      cardValueSum: 0
    }
  }

  organizeAces = () => {
    const { drawnCards } = this.state;
    let aceArr = []
    let regularArr = []

    drawnCards.forEach(card => {
      if (card.value === 'ACE') {
        aceArr.push(card);
      } else {
        regularArr.push(card);
      }
    });

    return regularArr.concat(aceArr)
  }

  resetGame = () => {
    this.setState({
      deckId: '',
      gameOn: false,
      drawnCards: [],
      cardValueSum: 0
    })
  }
  
  cardSum = () => {
    let { cardValueSum, gameOn} = this.state
    let newSum = 0;
    let organizedArr = this.organizeAces();
    console.log(organizedArr)
    if (gameOn && !(cardValueSum >= 21)) {
        organizedArr.forEach(card => {
          if (card.value === 'JACK' || card.value === 'KING' || card.value === 'QUEEN') {
            newSum += 10;
          } else if (card.value === 'ACE' && newSum > 10) {
            newSum += 1;
          } else if (card.value === 'ACE' && newSum < 10) {
            newSum += 11;
          } else {
            let cardValueInt = parseInt(card.value)
            newSum += cardValueInt;
          }
        });
      }

      this.setState({
        cardValueSum: newSum
      })

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
        .then(() => {
          this.cardSum();
        })
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
    })
    .then(() => {
      this.cardSum();    
    })
    .catch(err => {
      console.log('Error fetching cards!')
    })
  };

  hitMe = (event) => {
    event.preventDefault();

    if (!this.state.busted) {
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
    .then(response => {
      let newCards = this.state.drawnCards;
      newCards.push(response.data.cards[0])
      this.setState({
        drawnCards: newCards
      })
    })
    .then(() => {
      this.cardSum();
     
    })
    .catch(err => {
      console.log('Error fetching cards!')
    })
    }
    
  };

  handleSelectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  
  render () {
      const { deckId, gameOn, drawnCards, cardValueSum } = this.state;
   console.log(this.state)
    if (gameOn) {
      return (
        <React.Fragment>
        <h1>Blackjack</h1>
        <Hand 
        deckId={ deckId }
        gameOn={ gameOn }
        drawnCards={ drawnCards }
        hitMe={ this.hitMe }
        cardValueSum={ cardValueSum }
        resetGame={ this.resetGame }
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