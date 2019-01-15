import React, { Component } from "react";
import Hand from "./hand.js";
const axios = require("axios");



class Menu extends Component {
  constructor() {
    super();
    this.state = {
      deckid: "",
      cardDraw: [],
      drawOneCard: [],
      ajaxRequest: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCards = this.getCards.bind(this);
    this.handleDrawCards = this.handleDrawCards.bind(this);
    this.handleOneCard = this.handleOneCard.bind(this)
  }

  handleChange(event) {
    // debugger;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getCards() {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => {
        // debugger;
        this.setState({
          deckid: response.data.deck_id
        });
      })
      .catch(err => {
        console.log("error fetching cards");
      });
  }

  // deckInput
  handleDrawCards() {
    // let deckid = deckInput
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckid}/draw/?count=2`
      )
      .then(response => {
        this.setState({
          cardDraw: response.data.cards
        });
      });
  }

  handleOneCard(){
    axios
    .get(`https://deckofcardsapi.com/api/deck/${this.state.deckid}/draw/?count=1`)
    .then(response => {
      this.setState({
        drawOneCard: response.data.cards
      })
    })
  }

  // componentDidMount(){
  //   this.getCards()
  // }

  render() {
    console.log(this.state.drawOneCard,"this")
    let finalCardDraw = this.state.cardDraw.map(card => {
      return <img src={card.image} />;
    });
    // let oneSingleCardDraw = this.state.drawOneCard.map(card => {
    //   this.setState({
    //     drawOneCard: card.image
    //  })
    // })

     let oneSingleCardDraw = this.state.drawOneCard.map(card => {
      return <img src={card.image} />
    })

    // console.log(finalCardDraw);
    // console.log(this.state.existDeckid, "this")
    const { deckid } = this.state;
    return (
      <>
        <h1>BlackJack</h1>

        <br />

        <Hand
          deckId={this.state.deckid}
          drawCards={this.cardDraw}
          handleDrawCards={this.handleDrawCards}
          getCards={this.getCards}
          handleChange={this.handleChange}
          finalCardDraw={finalCardDraw}
          handleOneCard={this.handleOneCard}
          oneSingleCardDraw={oneSingleCardDraw}/>

      </>
    );
  }
}

export default Menu;

// <button onClick={this.getCards}>Generate Deck</button>
// {this.state.deckid}
// <br />
//
// <label>Input Existing Text</label>
// <input onChange={this.handleChange}  type="text" />
// <button onClick={this.handleDrawCards}>Draw</button>

// <button onClick={this.handleDrawCards}>Draw</button>


// let oneSingleCardDraw = this.state.drawOneCard.map(card => {
//   return <img src={card.image} />
// })
