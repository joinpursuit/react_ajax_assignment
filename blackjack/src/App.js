import React, { Component } from "react";
import axios from "axios";
import Cards from "./Cards.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      firstPage: true,
      deckID: "",
      cards: []
    };
  }
  newDeck = () => {
    let cardState = [...this.state.cards];
    axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
      .then(response => {
        cardState.push(
          response.data.cards[0].image,
          response.data.cards[1].image
        );
        this.setState({
          deckID: response.data.deck_id,
          cards: cardState
        });
        console.log(cardState);
        console.log(`Hurray! Your deck ID is ${this.state.deckID}`);
        console.log(this.state.cards);
      })
      .catch(error => {
        console.log("Error");
      });
    this.setState({
      firstPage: false
    });
  };

  existingDeck = () => {
    let cardState = [...this.state.cards];
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=2`
      )
      .then(response => {
        cardState.push(
          response.data.cards[0].image,
          response.data.cards[1].image
        );
        this.setState({
          deckID: response.data.deck_id,
          cards: cardState
        });
      })
      .catch(error => {
        console.log("Error");
      });
    this.setState({
      firstPage: false
    });
  };

  updateInputValue = event => {
    this.setState({
      deckID: event.target.value
    });
  };

  drawCard = () => {
    let cardState = [...this.state.cards];
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`
      )
      .then(response => {
        cardState.push(response.data.cards[0].image);
        this.setState({
          cards: cardState
        });
      })
      .catch(error => {
        console.log("Error");
      });
  };

  render() {
    const { firstPage, deckID, cards } = this.state;
    if (firstPage) {
      return (
        <div className="App">
          <img
            src="https://www.shareboston.org/wp-content/uploads/2018/09/Blackjack.jpg"
            alt=""
            className="logo"
          />
          <br />
          <button onClick={this.newDeck}>Generate New Deck</button>
          <p>Input Existing Deck</p>
          <input type="text" value={deckID} onChange={this.updateInputValue} />
          <br />
          <br />
          <button onClick={this.existingDeck}>Generate Existing Deck</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <img
            src="https://www.shareboston.org/wp-content/uploads/2018/09/Blackjack.jpg"
            alt=""
            className="logo"
          />
          <br />
          <p>Deck ID: {deckID}</p>
          <button onClick={this.drawCard}>Hit me!</button>
          <br />
          <br />
          {cards.map(image => (
            <Cards source={image} key={image} />
          ))}
        </div>
      );
    }
  }
}

export default App;
