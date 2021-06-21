import React, { useState, Component } from 'react';


function calculateWinner(squares: any[]): { winner: string | null, winningSquares: number[] } {
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

type squareProps = {
    value: string,
    onClick: (i: number) => void,
    isWinner: boolean,
    currentValue: number,
}
const Square = (props: squareProps): React.ReactElement => {
    const className = props.isWinner ? "square winner" : "square";
    return (
        <button className={className}
            onClick={() => props.onClick(props.currentValue)}>
            {props.value}
        </button>
    )
}

type boardProps = {
    squares: string[],
    onClick: (i: number) => void
    winningSquares: number[]

}
const Board = (props: boardProps): React.ReactElement => {
    const renderSquare = (i: number) => {
        return (
            <Square
                value={props.squares[i]}
                onClick={props.onClick}
                isWinner={props.winningSquares.includes(i)}
                currentValue={i}
            />
        );
    }


    return (
        <div>
            {/* <div className="status">{status}</div> */}
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );

}

type historyProps = {
    squares: any[],
    player: string,
    winner: any,
    winningSquares: number[]
}



interface IProps {
}

interface IState {
    history: historyProps[];
    stepNumber: number;
}
export class Game extends Component<IProps, IState> {
    // export const Game = (props:GameProps): React.ReactElement => {
    //
    constructor(props: historyProps) {
        super(props);
        this.redo = this.redo.bind(this);
        this.undo = this.undo.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(i: number) {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber
        const curHistory = history.slice(0, stepNumber + 1);
        const current = curHistory[curHistory.length - 1];
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
        // setHistory(history);
        // setStepNumber(history.length - 1);
    }

    jumpTo(step: number) {
        this.setState({ stepNumber: step });
    }

    undo(): void {
        const _stepNumber = this.state.stepNumber;
        if (_stepNumber === 0) {
            return;
        }
        this.setState({ stepNumber: _stepNumber - 1 });
    }

    redo(): void {
        const _stepNumber = this.state.stepNumber;
        if (_stepNumber === this.state.history.length - 1) {
            return;
        }

        this.setState({ stepNumber: _stepNumber + 1 });
    }

    isDraw(current: historyProps): boolean {
        for (let i = 0; i < current.squares.length; i++) {
            const entry = current.squares[i];
            if (!entry) {
                return false;
            }
        }
        return true;
    }
    render() {
        const curHistory = this.state.history;
        const current = curHistory[this.state.stepNumber];
        const winner = current.winner;

        let status = `Next player: ${current.player}`;
        if (this.isDraw(current)) {
            status = 'No one wins 🙃'
        }

        if (winner) {
            status = `Payer ${winner} won!`
        }

        const t = (i: number) => {
            debugger;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                        // onClick={(i:number) => {handleClick(i)}}
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

type Props = {
    str: string
}

export const MyComponent = (props: Props): React.ReactElement => {
    const [count, setCounter] = useState<number>(0);
    const [something, setSomething] = useState<string>('oops');

    return (
        <>
            <div>
                {props.str}
                {count}
            </div>
            <button onClick={() => { setCounter(count + 1) }}>Click Me</button>
        </>
    )
}
