// import React, { Component } from "react";
// import axios from "axios";
//
// import "./App.css";
//
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       deck_id: ""
//     };
//   }
//
//   handleGenerateClick = () => {
//     axios
//       .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//       .then(res => {
//         this.setState({
//           deck_id: res.data.deck_id
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   render() {
//     return (
//       <div className="App">
//         <h1>Black jack</h1>
//         <button onClick={this.handleGenerateClick}>Generate Deck</button>
//         <p>Deck ID: {this.state.deck_id}</p>
//       </div>
//     );
//   }
// }
//
// export default App;

import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Card } from "./Card";

class App extends Component {
  state = {
    deckID: null,
    remaining: 0,
    cards: []
  };

  componentDidMount() {
    const deckURL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    axios
      .get(deckURL)
      .then(res => {
        this.setState({
          deckID: res.data.deck_id,
          remaining: res.data.remaining
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCardDraw = () => {
    const { deckID } = this.state;
    const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;

    axios.get(url).then(res => {
      console.log("BEFORE SET STATE", this.state.cards);
      console.log("RES CARD", res.data.cards);
      this.setState({
        cards: [...this.state.cards, ...res.data.cards],
        remaining: res.data.remaining
      });
      console.log("AFTER SET STATE", this.state.cards);
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="header">
          <img
            className="img"
            src="https://www.prismcasino.com/wp-content/themes/prismcasino/images/casinogames/top_blackjack.png"
            alt="card"
          />
          <p>Deck ID: {this.state.deckID}</p>
        </div>
        <div className="card-container">
          {this.state.cards.map(card => (
            <Card card={card} />
          ))}
        </div>
        <div id="button1">
          <button id="button" onClick={this.handleCardDraw}>
            Hit me!
          </button>
        </div>
      </div>
    );
  }
}

export default App;
