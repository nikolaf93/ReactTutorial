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
      return { winner: squares[a], winningSquares: lines[i] };
    }
  }
  return { winner: null, winningSquares: [] };
}

function Square(props) {
  const className = props.isWinner ? "square winner" : "square";
  return (
    <button className={className}
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
        isWinner={this.props.winningSquares.includes(i)}
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
    this.redo = this.redo.bind(this);
    this.undo = this.undo.bind(this);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        player: "X",
        winner: null,
        winningSquares: []
      }],
      stepNumber: 0
    }
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
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

    const winnerData = calculateWinner(nextSquares);
    const nextWinner = winnerData.winner;
    const winningSquares = winnerData.winningSquares;

    history.push({
      squares: nextSquares,
      player: nextPlayer,
      winner: nextWinner,
      winningSquares
    })
    this.setState({ history, stepNumber: history.length - 1 });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    })
  }

  undo() {
    const _stepNumber = this.state.stepNumber;
    if (_stepNumber === 0) {
      return;
    }
    this.setState({
      stepNumber: _stepNumber - 1
    })
  }

  redo() {
    const _stepNumber = this.state.stepNumber;
    if (_stepNumber === this.state.history.length - 1) {
      return;
    }
    this.setState({
      stepNumber: _stepNumber + 1
    })
  }

  isDraw(current) {
    for (let i = 0; i < current.squares.length; i++) {
      const entry = current.squares[i];
      if (!entry) {
        return false;
      }
    }
    return true;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = current.winner;

    let status = `Next player: ${current.player}`;
    if(this.isDraw(current)) {
      status = 'No one wins 🙃'
    } else if (winner) {
      status = `Payer ${winner} won!`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={current.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.undo}>{'<'}</button>
          <button onClick={this.redo}>{'>'}</button>
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
