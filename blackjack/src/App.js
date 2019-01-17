import React from 'react';
import './App.css';
import axios from 'axios'

import Menu from './components/Menu'
import { Hand } from './components/Hand'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deckId: '',
      cardsRemaining: [],
      preGameMenu: null,
      imgURL: [],
      clickDraw: false,
      clickHome: false,
      count: 2,
    }

    this.handleNewGame = this.handleNewGame.bind(this)
    this.handleJoinGame = this.handleJoinGame.bind(this)
    this.handleHome = this.handleHome.bind(this)
    this.handleHitMe = this.handleHitMe.bind(this)
  }


  componentDidMount = (event) => { //re: secondPage() - Forms homework line 186 and 234
    axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${this.state.count}`)
    .then(response => {
      console.log('axios response', response);
      console.log('deckid', this.state.deckId);

      this.setState ({
        cardsRemaining: response.data.remaining,
        deckId: response.data.deck_id, //for handleHitMe
      })
    })
    .catch(error => console.log('Error: ', error))
  }

  homePage = () => {
    return (
      <React.Fragment>
        <Menu handleNewGame={this.handleNewGame} handleJoinGame={this.handleJoinGame} handleChange={this.handleChange} deckId={this.state.deckId} cardsDrawn={this.state.cardsDrawn}/>
      </React.Fragment>
    )
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      deckId: event.target.value,
    })
    // debugger
  }

  handleNewGame = (event) => {
    // this.setState ({
    //   deckId: 'new',
    // })

    const draw = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${this.state.count}`
    axios.get(draw)
    .then(response => {
      console.log('axios response', response);
      console.log('deckid', this.state.deckId);

      this.setState ({
        clickDraw: true,
        clickHome: false,
        cardsRemaining: response.data.remaining,
        deckId: response.data.deck_id, //for handleHitMe
        imgURL: response.data.cards,
        count: 1,
      })
    })
    .catch(error => console.log('Error: ', error))
  }

  handleJoinGame = (event) => {
    // this.setState ({
    //   deckId: event.target.value,
    // })
    const draw = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${this.state.count}`
    axios.get(draw)
    .then(response => {
      console.log('axios response', response);
      console.log('deckid', this.state.deckId);
// debugger
      this.setState ({
        clickDraw: true,
        clickHome: false,
        cardsRemaining: response.data.remaining,
        deckId: this.state.deckId, //for handleHitMe
        imgURL: response.data.cards,
        count: 1,
      })
    })
    .catch(error => console.log('Error: ', error))
  }


  handleHome = (event) => { //reset
    this.setState ({
      clickHome: true,
      clickDraw: false,
      deckId: '',
      cardsRemaining: [],
      preGameMenu: null,
      imgURL: [],
      count: 2,
    })
    this.componentDidMount()
  }

  handleHitMe = (event) => {
    const draw = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${this.state.count}`
    axios.get(draw)
    .then(response => {
      console.log('axios response', response);
      console.log('deckid', this.state.deckId);

      this.setState ({
        clickDraw: true,
        clickHome: false,
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
            cardsRemaining={this.state.cardsRemaining}
          />
        </React.Fragment>
      )
    } else if (clickHome && clickDraw){
      return (
        <React.Fragment>
          {this.homePage()}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {this.homePage()}
        </React.Fragment>
      )
    }
  }

}



export default App;
