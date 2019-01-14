import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck_id: "",
      cards: "",
      currentDeckUrls: []
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleGenerateClick = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        this.setState({
          deck_id: res.data.deck_id
        })
      })
      .catch(err =>{
        console.log(err)
      })
  }

  handleDrawClick = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=2`)
      .then(res => {
        let cardsArr = res.data.cards;
        let oldToNewDeck = this.state.currentDeckUrls;
        for (let i = 0; i < cardsArr.length; i++) {
          oldToNewDeck.push(cardsArr[i].image)
        }
        this.setState({
          cards: cardsArr,
          currentDeckUrls: oldToNewDeck
        })
      })
      .catch(err =>{
        console.log(err)
      })
  }

  displayCurrentDeck = () => {
    let currentDeckUrls = this.state.currentDeckUrls;
    return currentDeckUrls.map(url => {
      return <img alt="card" src={url}></img>
      })
    }


  render() {
    let {deck_id, cards} = this.state
      if (!cards) {
        return (
          <div className="App">
            <div id="pre-game">
                <h1>Blackjack</h1>
              <button onClick={this.handleGenerateClick}>Generate Deck</button>
              <span><input
                type="text"
                name="deck_id"
                value={deck_id}
                placeholder="Input existing deck id"
                onChange={this.handleChange} />
              <button onClick={this.handleDrawClick}>Draw</button>
              </span>
            </div>
          </div>
        )
      } else {
        return (
          <div className="App">
            <div id="game">
              <h1>Blackjack</h1>
              <p>Deck id: {deck_id}</p>
              <div id="cardImgs">
                {this.displayCurrentDeck()}
              </div>
              <span>
                <button onClick={this.handleDrawClick}>Hit me!</button>
              </span>
            </div>
          </div>
        )
      }
  }
}

export default App;
