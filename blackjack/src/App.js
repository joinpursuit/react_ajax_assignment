import React from 'react';
import './App.css';
import Axios from 'axios'

import Menu from './components/Menu'
import { Hand } from './components/Hand'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deckId: null,
      cardsDrawn: [],
      preGameMenu: null,
      imgURL: '',
      clickDraw: false,
      clickHome: false,
    }

    this.handleDraw = this.handleDraw.bind(this)
  }

  handleDraw = (event) => {
    // const {clickDraw} = this.state;

    this.setState ({
      clickDraw: true,
      clickHome: false
    })
  }

  handleHome = (event) => {
    // const {clickHome} = this.state;
    this.setState ({
      clickHome: true,
      clickDraw: false
    })
  }

  render() {
    const {clickDraw, clickHome} = this.state

    if (clickDraw) {
      return(
        <React.Fragment>
          <Hand handleHome={this.handleHome}/>
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
