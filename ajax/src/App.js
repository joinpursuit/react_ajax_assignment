import React, { Component } from "react";
import "./App.css";
import Menu from "./Menu.js";
import Hand from "./Hand.js";
const axios = require("axios");

class App extends Component {
  constructor() {
    super();
    this.state = {
      deckId: "",
      cards: []
    };
  }

  createDeck = async () => {
    let response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let newDeckId = response.data.deck_id;
    this.setState({ deckId: newDeckId });
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=2`
    );
    let hand = res.data.cards;
    this.setState({ cards: hand });
  };

  hitMe = async () => {
    const { deckId, cards } = this.state;
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    let hitIt = response.data.cards;
    this.setState({ cards: [...cards, ...hitIt] });
  };

  render() {
    const { deckId, cards } = this.state;
    return (
      <div className="App">
        <Menu newDeck={this.createDeck} deckId={deckId} />
        <Hand cards={cards} hit={this.hitMe} />
      </div>
    );
  }
}

export default App;
