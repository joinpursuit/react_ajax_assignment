import React from 'react';
import Menu from './components/menu';
import Hand from './components/hand';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      isCompleted: false,
      scores: 0,
      textInput: '',
      cardsArr: [],
      players: []
    }
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
    this.generateId = this.generateId.bind(this);
    this.handleHandSubmit = this.handleHandSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePickOne = this.handlePickOne.bind(this);
  }

  //create a new deck with click on the button, and show two cards

  handleMenuSubmit () {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2')
      .then(response => response.json())
      .then(data => {
        
        let totalValue = 0;
        data.cards.map(card => {
          let cardValue = isNaN(card.value) ? 1 : parseInt(card.value); 
          return totalValue += cardValue;
        })
        
        const newPlayer = {
          id: this.generateId(),
          cards: data.cards,
          deckId: data.deck_id
        }
        
        this.setState({
          cardsArr: data.cards,
          players: [...this.state.players, newPlayer],
          scores: totalValue
        })  
      })
  }
  
  //draw a new card from previous deck, update the state

  handlePickOne (event) {
    
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.players[0].deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
        let newTotalValue = this.state.scores;
        data.cards.map(card => {
          let cardValue = isNaN(card.value) ? 1 : parseInt(card.value); 
          return newTotalValue += cardValue;
        })
        
        const updatedPlayer = {
          cards: [...this.state.cardsArr, data.cards[0]],
        }
        
        this.setState({
          cardsArr: [...this.state.cardsArr, data.cards[0]],
          players: [...this.state.players, updatedPlayer],
          scores: newTotalValue
        })  
      })
  }
  
  //Manually input deck_id, hit the button to join an existing game. 

  handleChange (event) {
    this.setState({textInput: event.target.value})
  }

  handleHandSubmit (event) {
    event.preventDefault();
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.textInput}/draw/?count=2`)
      .then(response => response.json())
      .then(data => {
        debugger
        let totalValue = 0;
        data.cards.map(card => {
          let cardValue = isNaN(card.value) ? 1 : parseInt(card.value); 
          return totalValue += cardValue;
        })
        
        const newPlayer = {
          id: this.generateId(),
          cards: data.cards,
          deckId: data.deck_id
        }
        
        this.setState({
          cardsArr: data.cards,
          players: [...this.state.players, newPlayer],
          scores: totalValue,
          textInput: ''
        })  
      })
  }

  //Generate userId for each player

  generateId () {
    return Math.random().toString(34).slice(2);
  }

  render () {
    console.log(this.state)

    return (
      <>
        <h2>Welocome to BlackJack!</h2><hr/>
        <button onClick={this.handlePickOne}>Hit Me To 21!</button><br /><br />

        <Menu 
          key={this.generateId()}
          cardsArr={this.state.cardsArr}
          handleSubmit={this.handleMenuSubmit}
        />
        <br/><br/>

        <Hand
          key={this.generateId()}
          textInput={this.state.textInput}
          cardsArr={this.state.cardsArr}
          handleChange={this.handleChange}
          handleSubmit={this.handleHandSubmit}
        />

      </>
    )
  }
}


export default App;