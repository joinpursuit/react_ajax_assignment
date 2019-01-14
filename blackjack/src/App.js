import React, { Component } from 'react';
import './App.css';
import { Hand } from "./Hand";
// import { Menu } from './Menu'
const axios = require("axios")




class App extends Component {
  constructor(){
    super()
    this.state= {
      deckId:"",
      hand:[],
      setGame:false,
      message:''


    }
  }

  drawCard =() => {
    if(this.state.deckId){
      axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`)
      .then(res => {
        this.setState({
          hand: res.data.cards,
          setGame:true
        })
      })
      .catch(err => {
        console.log("error")
      })

    }else {
      this.setState({
        message:"Please Input a Valid Deck ID! ya dopey.."
      })
    }


  }
  getCardId=()=> {
    axios
    .get("https://deckofcardsapi.com/api/deck/new/")
    .then(res => {
      this.setState({
        deckId:res.data.deck_id,
        setGame:true
      })
    })
    .catch(err => {
      console.log("error")
    })
  }


  drawACard =()=> {
    if(this.state.deckId){
      axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
      .then(res => {
        this.setState({
          hand: this.state.hand.concat(res.data.cards)
        })
      })

    }else {
      axios
      .get("https://deckofcardsapi.com/api/deck/new/")
      .then(res => {
        this.setState({
          hand: this.state.hand.concat(res.data.cards)
        })
      })
    }
  }


  handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };



  render() {
    console.log(this.state.hand)
    if(this.state.setGame===true){
      return (
        <>
        <header>
        <h1>BlackJack</h1>
        <h3>Current Deck ID :</h3>
        <p>{this.state.deckId}</p>
        <button onClick={this.drawCard}>Show cards/New Hand</button>
        <button onClick={this.drawACard}>Hit Me!</button>
        </header>
        <Hand
        hand={this.state.hand}
        />

        </>
      )
    }else {
      return(
        <>

        <header>
        <h1>BlackJack</h1>
        <button onClick={this.getCardId}>New Game</button>
        <button value ={this.state.deckId} onClick={this.drawCard}>Join Game</button>
        </header>
        <input
          type="text"
          placeholder="Insert Deck ID"
          name="deckId"
          value={this.state.deckId}
          id ="deckId"
          onChange={this.handleChange}
          />
          <p>{this.state.message}</p>

        </>
      )
    }

  }
}

export default App;
