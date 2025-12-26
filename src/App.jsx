import {useState} from "react";
function Square(){
    function switchPlayer(player){
        return player === "X" ? "O" : "X";
    }
    const [squareValue, setSquareValue] = useState(" - ");
    function handleClick(){
        console.log('clicked!');
        setSquareValue("X");
        console.log(squareValue);
        switchPlayer(squareValue);
    }
    return <button className="square" 
                   onClick={handleClick}
            >
            {squareValue}
            </button>
}
export default function Board(){
    return (
        <>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            
        </>
        );
}