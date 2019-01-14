import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      deckURL: "",
      firstCard: "",
      secondCard: ""
    };
  }
  getNewDeck = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
      .then(response => {
        debugger;

        this.setState({
          deckURL: response.data.deck_id,
          firstCard: response.data.cards[0].image,
          secondCard: response.data.cards[1].image
        });

        console.log(`Hurray! Your deck ID is ${this.state.deckURL}`);
      })
      .catch(error => {
        console.log("Error: Unable to get new deck");
      });
  };

  render() {
    const { firstCard, secondCard } = this.state;
    return (
      <div className="App">
        <h1>Blackjack</h1>
        <button onClick={this.getNewDeck}>Generate Deck</button>
        <p>Input Existing Deck</p>
        <input type="text" />

        <div>
          <br />
          <img className="firstCard" alt="" src={firstCard} />
          <img className="secondCard" alt="" src={secondCard} />
        </div>
      </div>
    );
  }
}

export default App;
