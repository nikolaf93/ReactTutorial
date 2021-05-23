import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        player: "X",
        winner: null
      }]
    }
  }

  handleClick(i) {
    const current = this.state.history[this.state.history.length - 1];
    const squares = current.squares;
    const player = current.player;
    const winner = current.winner;
    // Do not handle a click if there is a winner or if there is a non null value in a square.
    if (winner || squares[i]) {
      return;
    }


    const nextSquares = squares.slice();

    nextSquares[i] = player;

    const nextPlayer = player === "X" ? "Y" : "X";
    const nextWinner = calculateWinner(nextSquares);
    this.state.history.push({
      squares: nextSquares,
      player: nextPlayer,
      winner: nextWinner
    })
    this.setState({history: this.state.history})
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = current.winner;
    let status = winner ? `Payer ${winner} won!` : `Next player: ${current.player}`

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
