import Board from "./App.jsx";
import {useState, useEffect} from "react";
import "./App.css";
export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const nextPlayer= currentMove % 2 === 0;
    const currentSquares= history[currentMove];
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        //true sets X, false sets O
    }
    const moves= history.map((squares, move) =>{
        let description;
        if (move>0){
            description  ="Go to move #" + move;
        } else {
            description= "Go to game start";
        }
        return(
            <>
            <li key={move}>
                <button onClick={() => jumpTo(move)}> {description} </button>
            </li>
            </>
        );
    });
    function newGame(){
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        
    }
    //also look at inserting player name functionality
    
    return(
        <>
            <div className="app-state">
                <div className="game">
                    <div className="game-board">
                        <div>You are on {currentMove === 0 ? " game start" : "move # " + currentMove}</div>
                            <Board nextPlayer={nextPlayer}
                                    squares={currentSquares}
                                    onPlay={handlePlay}
                                   newGame={newGame}
                                    />
                    </div>
                </div>
                <div className="game-info">
                    <ol> {moves} </ol>
                </div>            
            </div>
        </>
    )
}