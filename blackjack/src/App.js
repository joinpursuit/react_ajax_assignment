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
    }

    this.handleDraw = this.handleDraw.bind(this)
  }

  handleDraw = (event) => {
    const {clickDraw} = this.state;
      this.setState ({
        clickDraw: true
      })

  }

  render() {

    if (this.state.clickDraw) {
      return(
        <React.Fragment>
            <Hand />
        </React.Fragment>
      )

    } else {
      return (
      <React.Fragment>
      <Menu deckId={this.state.deckId} cardsDrawn={this.state.cardsDrawn} handleDraw={this.handleDraw}/>

      </React.Fragment>
      )
    }
  }

}



export default App;
