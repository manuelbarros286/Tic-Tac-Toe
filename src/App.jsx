import {useState} from "react";
import "./App.css";
//from parent component but unresolved function if not imported?
import setNextPlayer from "./Game.jsx";
import setHistory from "./Game.jsx";
import setCurrentMove from "./Game.jsx";
import moves from "./Game.jsx";
function Square({value, onSquareClick}){
    return <button className="square" 
                   onClick={onSquareClick}>
            {value}
            </button>
}

//set up helper function

function calculateWinner(squares){
    const lines =[
        //permutations of winning lines
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i= 0; i<lines.length; i++){
        //destructure the winning line and compare assigned values of either "X" or "O"
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            //return a value if there is a winning line
            return squares[a];
        }
    }
    return null;
}
export default function Board({nextPlayer, squares, onPlay, newGame}){
    //passed down from parent component 'Game'
    function handleClick(i){
        //check if square is already populated, and return early
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        if(nextPlayer){
            nextSquares[i] = "X";
        } else{
            nextSquares[i] = "O";
        }
        
        onPlay(nextSquares);
        // setSquares(nextSquares);
        // // console.log(squares);
        // // console.log(nextSquares);
        // setNextPlayer(!nextPlayer);
    }
    const winner= calculateWinner(squares);
    let status;
    if(winner){
        status = "Winner: " + winner;
    } else if(!squares.includes(null)){
        status = "It's a Tie!";
    } else {
        status = "It is  " + (nextPlayer ? "X" : "O") + "'s turn";
    }
    function startNewGame(newGame){
        return(
            <div className="board-footer">
            <button onClick={handleRestart}>Play Again</button>
            </div>

        );
    }
    function handleRestart(){
        onPlay(Array(9).fill(null));
        setNextPlayer(true);
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        moves = [];
    }
    
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div> 
            <div className="board-row"> 
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
            {(winner || !squares.includes(null)) ? startNewGame() : null}
        </>
    );
}