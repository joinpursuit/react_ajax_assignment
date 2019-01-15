import React from "react";
import "./App.css";
import ReactDom from 'react-dom'
const axios = require("axios");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      deckURL: "",
      CardImage:" ",
      hand:[]
    };
    this.drawACard = this.drawACard.bind(this);
  }

  getDeckofCards = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/")
      .then(response => {
        this.setState({
          deckURL: response.data.deck_id
        });
      })
      .catch(err => {
        console.log("error fetching deck");
      });
  };

  // drawACard = () => {
  //   if(this.state.deckURL){
  //   axios
  //     .get(`https://deckofcardsapi.com/api/deck/${this.state.deckURL}/draw/?count=1`)
  //     .then(response => {
  //       this.setState({
  //         deckId: response.data.deck_id,
  //         CardImage: response.data.cards[0].image
  //       });
  //       console.log(this.state)
  //     })
  //     .catch(err => {
  //       console.log("error fetching deck");
  //     });
  //   } else{
  //     axios
  //       .get("https://deckofcardsapi.com/api/deck/new/")
  //       .then(response => {
  //         this.setState({
  //           deckId: response.data.deck_id,
  //           CardImage: response.data.cards[0].image
  //         });
  //         console.log(this.state)
  //       })
  //       .catch(err => {
  //         console.log("error fetching deck");
  //       });
  //   }
  // };
  drawACard = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deckURL}/draw/?count=1`)
      .then(response => {
        this.setState({
          deckURL: response.data.deck_id,
          CardImage: response.data.cards[0].image,
          hand: this.state.hand.concat(response.data.cards)
        });
        console.log(this.state)
      })
      .catch(err => {
        console.log("error fetching deck");
      });
  };


  render() {


const { CardImage,hand } = this.state;
    console.log(this.state);
    return (
      <div>

            <button onClick={this.getDeckofCards}> New Deck </button>
            <button onClick={this.drawACard} > Draw </button>
            <img  alt="" src={CardImage} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));

export default App;
