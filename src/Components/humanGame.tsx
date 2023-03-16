import React from 'react';
import './game.css';
import {Link} from 'react-router-dom';

function HumanGame(){
    var clickedTiles = ['', '', '', '', '', '', '', '', ''];

    var pxScore = 0;
    var poScore = 0;

    var playerOne = 'X';
    var gameOn = true;

    var playerTwo = 'O';
    let rand = Math.random();

    var winCondition = [
        { x: [0, 1, 2], winningLine: "winningLine-row1" },
        { x: [3, 4, 5], winningLine: "winningLine-row2" },
        { x: [6, 7, 8], winningLine: "winningLine-row3" },
  
        { x: [0, 3, 6], winningLine: "winningLine-col1" },
        { x: [1, 4, 7], winningLine: "winningLine-col2" },
        { x: [2, 5, 8], winningLine: "winningLine-col3" },
  
        { x: [0, 4, 8], winningLine: "winningLine-dia1" },
        { x: [2, 4, 6], winningLine: "winningLine-dia2" },
    ];

    var currTurn = '';
    rand >= 0.5 ? currTurn = playerOne : currTurn = playerTwo;
    //Called everytime a player turn ends
    function ChangeTurn(){
        if(currTurn === playerOne){
            currTurn = playerTwo;
            var p = document.getElementById('turn');
            if(p != null){
                p.innerHTML = `Turn - ${ currTurn}`;
            }
            return currTurn
        }
        else{
            currTurn = playerOne;
            var p = document.getElementById('turn');
            if(p != null){
                p.innerHTML =`Turn - ${ currTurn}`;
            }
            return currTurn
        }
    }
    function ScoreCtr(){
        if(currTurn === playerOne){
            pxScore++;
            var score = document.getElementById('p1');
            if(score !== null){
                score.innerHTML = `Player X Wins- ${pxScore}`;
            }
        }
        else{
            poScore++;
            var score = document.getElementById('p2');
            if(score !== null){
                score.innerHTML = `Player O Wins- ${poScore}`;
            }
        }
    }
    function GameEnd(){
        for (const wins of winCondition) {
            //Object Destructuring
            const { x, winningLine } = wins;
            var a = clickedTiles[x[0]];
            var b = clickedTiles[x[1]];
            var c = clickedTiles[x[2]];
            if (a !== '' && a === b && b === c) {
                var line = document.getElementById("winningLine");
                gameOn = false;
                ScoreCtr();
                if(line !== null){
                    line.classList.add(winningLine);
                    alert('Player ' + currTurn + ' Has Won');
                }
            }
        }
        let draw = !clickedTiles.includes('')
            if(draw && gameOn){
                gameOn = false;
                alert("Draw!");
                return;
            }
    }
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        var cell = e.currentTarget
        if(cell.innerHTML === "" && gameOn === true){
            var index = parseInt(e.currentTarget.id);
            clickedTiles[index-1] = currTurn;
            console.log(clickedTiles)
            cell = e.currentTarget
            cell.innerHTML = currTurn;
            GameEnd();
            ChangeTurn();
        }
    };

    function Restart(){
        clickedTiles = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.tile').forEach(tile => tile.innerHTML = '');
        var ran = Math.random();
        gameOn = true;
        var line = document.getElementById("winningLine");
        if(line !== null){
            line.className = 'winningLine';
        }
        ran >= 0.5 ? currTurn = playerOne : currTurn = playerTwo;
        var p = document.getElementById('turn');
        if(p != null){
            p.innerHTML = `Turn - ${ currTurn}`;
        }
    }
    return (
        <React.Fragment>
            <Link to="/compGame" id = "Redirect">Versus Computer</Link>
            <h1 id ="p1">Player X Wins- {pxScore}</h1>
            <h1 id = "p2">Player O Wins- {poScore}</h1>
                <div id = "game">
                    <div className="tile right-border bottom-border" id = "1" onClick={handleClick}></div>
                    <div className="tile right-border bottom-border" id = "2" onClick={handleClick}></div>
                    <div className="tile bottom-border" id = "3" onClick={handleClick}></div>
                    <div className="tile right-border bottom-border" id = "4" onClick={handleClick}></div>
                    <div className="tile right-border bottom-border" id = "5" onClick={handleClick}></div>
                    <div className="tile bottom-border" id = "6" onClick={handleClick}></div>
                    <div className="tile right-border" id = "7" onClick={handleClick}></div>
                    <div className="tile right-border" id = "8" onClick={handleClick}></div>
                    <div className="tile" id = "9" onClick={handleClick}></div>
                    <div id="winningLine" className = "winningLine"></div>
                </div>
                <p id = "turn">Turn - {currTurn}</p>
            <button id="restart" onClick={Restart}>Restart</button>
        </React.Fragment>
    )
}


export default HumanGame