import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Menu } from "./Menu";
import { Hand } from "./Hand";
import { Endgame } from "./Endgame";

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck_id: "",
      gameOn: false,
      cardsArr: [],
      remaining: "",
      err: "",
      score: 0
    };
  }

  setScore = () => {
    let tempScore = 0;
    let numValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let tenValues = ["JACK", "QUEEN", "KING"];
    this.state.cardsArr.forEach(card => {
      if (numValues.includes(card.value)) {
        tempScore += Number(card.value);
      } else if (tenValues.includes(card.value)) {
        tempScore += 10;
      } else if (card.value === "ACE") {
        if (tempScore <= 10) {
          tempScore += 11;
        } else {
          tempScore += 1;
        }
      }
    });
    return tempScore;
  };

  resetForm = () => {
    window.location.reload(true);
  };

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
            if (
              this.state.cardsArr.length === 0 ||
              this.state.remaining === 0
            ) {
              this.setState({
                cardsArr: response.data.cards,
                deck_id: response.data.deck_id,
                gameOn: true,
                remaining: response.data.remaining
              });
            }
          })
          .catch(err => console.log("err"));
      })
      .catch(err => console.log("err"));
  };

  displayCards = () => {
    let display = [];
    this.state.cardsArr.forEach(card => {
      display.push(
        <img key={card.code} className="singleCard" src={card.image} alt="" />
      );
    });
    return display;
  };

  getCardsByNum = num => {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${
          this.state.deck_id
        }/draw/?count=${num}`
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

  hit = () => {
    if (this.state.cardsArr.length < 2) {
      this.getCardsByNum(2);
    } else {
      this.getCardsByNum(1);
    }
  };

  pressClick = event => {
    if (event.key === "Enter") {
      this.hit();
    }
  };

  render() {
    console.log(this.state);
    let { deck_id, cardsArr, gameOn, remaining, err, hidden } = this.state;
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
        {this.setScore() === 21 ? (
          <div>
            <Endgame
              handleChange={this.handleChange}
              deck_id={deck_id}
              draw={this.draw}
              hit={this.hit}
              remaining={remaining}
              err={err}
              hidded={hidden}
              cardsArr={cardsArr}
              pressClick={this.pressClick}
              setScore={this.setScore}
            />
            <h1>CONGRATS! PERFECT GAME!</h1>
            <button
              onClick={() => {
                this.resetForm();
                this.hit();
              }}
            >
              Play Again?
            </button>
            <div className="cardsDiv">{this.displayCards()}</div>
          </div>
        ) : (
          <div>
            {this.setScore() > 21 ? (
              <div>
                <Endgame
                  handleChange={this.handleChange}
                  deck_id={deck_id}
                  draw={this.draw}
                  hit={this.hit}
                  remaining={remaining}
                  err={err}
                  hidded={hidden}
                  cardsArr={cardsArr}
                  pressClick={this.pressClick}
                  setScore={this.setScore}
                />
                <h1>BUST! YOU LOSE!</h1>
                <button
                  onClick={() => {
                    this.resetForm();
                    this.hit();
                  }}
                >
                  Play Again?
                </button>
                <div className="cardsDiv">{this.displayCards()}</div>
              </div>
            ) : (
              <div>
                {!gameOn ? (
                  <Menu
                    handleChange={this.handleChange}
                    deck_id={deck_id}
                    draw={this.draw}
                    hit={this.hit}
                    remaining={remaining}
                    err={err}
                    hidded={hidden}
                    cardsArr={cardsArr}
                    pressClick={this.pressClick}
                    setScore={this.setScore}
                  />
                ) : (
                  <Hand
                    hit={this.hit}
                    deck_id={deck_id}
                    cardsArr={cardsArr}
                    remaining={remaining}
                    draw={this.draw}
                    resetForm={this.resetForm}
                    setScore={this.setScore}
                    displayCards={this.displayCards}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
