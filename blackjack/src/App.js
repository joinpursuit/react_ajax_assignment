import React from 'react';
import './App.css';
import axios from 'axios'

import Menu from './components/Menu'
import { Hand } from './components/Hand'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deckId: 'new',
      cardsDrawn: [],
      cardsRemaining: [],
      preGameMenu: null,
      imgURL: [],
      clickDraw: false,
      clickHome: false,
    }

    this.handleDraw = this.handleDraw.bind(this)
    this.handleHome = this.handleHome.bind(this)
    this.handleHitMe = this.handleHitMe.bind(this)
  }

  handleHome = (event) => {
    this.setState ({
      clickHome: true,
      clickDraw: false
    })
  }

  handleDraw = (event) => {
    const draw = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`
    axios.get(draw)
    .then(response => {
      console.log(response);

      this.setState ({
        clickDraw: true,
        clickHome: false,
        cardsDrawn: [ ...this.state.cardsDrawn, ...response.data.cards],
        cardsRemaining: response.data.remaining,
        deckId: response.data.deck_id, //for handleHitMe
        imgURL: response.data.cards,
      })

    })
    .catch(error => console.log('Error: ', error))

  }

  handleHitMe = (event) => {
    const draw = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
    axios.get(draw)
    .then(response => {
      console.log(response);

      this.setState ({
        clickDraw: true,
        clickHome: false,
        cardsDrawn: [ ...this.state.cardsDrawn, ...response.data.cards],
        cardsRemaining: response.data.remaining,
        deckId: response.data.deck_id, //for handleHitMe
        imgURL: [...this.state.imgURL, ...response.data.cards],
      })
    })
    .catch(error => console.log('Error: ', error))
  }

  render() {
    const {clickDraw, clickHome} = this.state

    if (clickDraw) {
      return(
        <React.Fragment>
          <Hand
            handleHome={this.handleHome}
            deckId={this.state.deckId}
            imgURL={this.state.imgURL.map(card => (
              <img key={card.code} src={card.image} alt=''/>
            ))}
            handleHitMe={this.handleHitMe}
          />
        </React.Fragment>
      )
    } else if (clickHome && clickDraw){
      return (
        <React.Fragment>
          <Menu handleDraw={this.handleDraw} deckId={this.state.deckId} cardsDrawn={this.state.cardsDrawn}/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Menu handleDraw={this.handleDraw} deckId={this.state.deckId} cardsDrawn={this.state.cardsDrawn}/>
        </React.Fragment>
      )
    }
  }

}



export default App;
