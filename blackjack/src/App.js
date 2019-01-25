import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Menu  from './Menu.js'
import Hand from './Hand.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      deckId: '',
      deck: []
    }
  }

  makeDeck = async () => {
     let response = await axios.get(
       "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
     );
     let newDeckId = response.data.deck_id;
     this.setState({ deckId: newDeckId });
     let response2 = await axios.get(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=2`);

     let currentHand = response2.data.cards //object here
     this.setState({ deck: currentHand })

   };

   getCard = async () => {
     const { deckId, deck } = this.state;

     let response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

     let nextCard = response.data.cards;
     this.setState({ deck: [...deck, ...nextCard] })
   }


   render(){
     const { deckId, deck } = this.state
     return(
       <div>
        <Menu newDeck={this.makeDeck} deckId={deckId} />
        <Hand deck={deck} draw={this.getCard} />
       </div>
     )
   }
}

export default App;
