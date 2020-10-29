import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
  render() {
    return(
      <div>This is a {this.props.value} of {this.props.suit}</div>
    );
  }
}

// class Field extends React.Component {
//   render() {
//     const card1 = this.props.player1Card;
//     const card2 = this.props.player2Card;
//     return(
//       <div>
//         <Card value={card1.value} suit={card1.suit}/>
//         <Card value={card2.value} suit={card2.suit}/>
//       </div>
//     )
//   }
// }

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: props.cards,
      field: null
    };
  }

  handleClick(card) {
    const length = this.state.hand.length
    this.setState({
      hand: this.state.hand.slice(1, length),
      field: card
    });

    this.props.handleGameStateChange(card);
  }

  renderField(card) {
    if(card) {
      return <Card
        key={card.value + card.suit}
        value={card.value}
        suit={card.suit}
      />;
    }
  }

  render() {
    return(
      <div>
        <div
          className="players"
          id={this.props.name}
          onClick={() => this.handleClick(this.state.hand[0])}
        >This is player {this.props.value}</div>

        <div>{this.renderField(this.state.field)}</div>

      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.state = {
      field: []
    }
  }

  handleStateChange(card) {
    this.setState({
      field: this.state.field.concat(card)
    })

    this.battle();
  }

  clearField() {
    this.setState({
      field: []
    });
  }

  battle() {
    const field = this.state.field

    // INSERT LOGIC TO UPDATE PLAYERS

    if(field.length > 1) {
      const card1 = field[0]
      const card2 = field[1]

      if(card1.value > card2) {
        console.log(`${card1.player} wins the battle!`);
        this.clearField();
      } else {
        console.log(`${card2.player} wins the battle!`);
        this.clearField();
      }
    }
  }

  render() {
    // https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
    const cards = deck().sort(() => Math.random() - 0.5);
    const player1Cards = cards.slice(0, cards.length / 2).map((card, _) => {
      return {value: card.value, suit: card.suit, player:1}
    });
    const player2Cards = cards.slice((cards.length / 2), cards.length).map((card, _) => {
      return {value: card.value, suit: card.suit, player:2}
    });

    return(
      <div id="game">
        <Player value="1" name="playerOne" cards={player1Cards} handleGameStateChange={this.handleStateChange} />
        <Player value="2" name="playerTwo" cards={player2Cards} handleGameStateChange={this.handleStateChange} />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function deck() {
  const suits = ["hearts", "diamonds", "spades", "clubs"];
  const values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  const cards = values.flatMap((value, _) => {
    return suits.map((suit, _) => {
      return {suit: suit, value: value};
    })
  })

  return cards;
}
