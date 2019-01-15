import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Menu } from "./Menu";
import { Hand } from "./Hand";

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck_id: "",
      gameOn: false,
      cardsArr: [],
      remaining: "",
      err: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  draw = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        axios
          .get(
            `https://deckofcardsapi.com/api/deck/${
              res.data.deck_id
            }/draw/?count=2`
          )
          .then(response => {
            if (this.state.cardsArr.length === 0) {
              this.setState({
                cardsArr: response.data.cards,
                deck_id: response.data.deck_id,
                gameOn: true,
                remaining: response.data.remaining
              });
            }
          })
          .catch(err => {
            console.log("error fetching image");
          });
      })
      .catch(err => console.log("err"));
  };

  hit = () => {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${
          this.state.deck_id
        }/draw/?count=1`
      )
      .then(response => {
        let arr = this.state.cardsArr;
        response.data.cards.forEach(el => {
          arr.push(el);
        });
        this.setState({
          cardsArr: arr,
          gameOn: true,
          remaining: response.data.remaining
        });
      })
      .catch(err => {
        console.log("err");
        this.setState({
          err: err
        });
      });
  };

  render() {
    let { deck_id, cardsArr, gameOn, remaining, err, hidden } = this.state;
    console.log(this.state);
    return (
      <div className="App">
        <div className="header">
          <h1>Blackjack</h1>
          <img
            id="donkey"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFAuwW6VaJr7FXhmgNm39Sa4-G4WA4tWPHDft5O_jdJLnzYHOkQ"
            alt=""
          />
        </div>

        {!gameOn ? (
          <Menu
            handleChange={this.handleChange}
            deck_id={deck_id}
            draw={this.draw}
            hit={this.hit}
            remaining={remaining}
            err={err}
            hidded={hidden}
          />
        ) : (
          <Hand
            hit={this.hit}
            deck_id={deck_id}
            cardsArr={cardsArr}
            remaining={remaining}
          />
        )}
      </div>
    );
  }
}

export default App;
