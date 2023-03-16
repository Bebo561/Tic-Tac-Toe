import React from 'react';
import './game.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { getElementError } from '@testing-library/react';

function HumanGame(){
    var pxScore = 0;
    var poScore = 0;
    var playerOne = 'X';
    var playerTwo = 'O';
    let rand = Math.random();
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

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        var cell = e.currentTarget
        if(cell.innerHTML === ""){
            cell = e.currentTarget
            cell.innerHTML = currTurn;
            ChangeTurn();
        }
    };
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
            <button id="restart">Restart</button>
        </React.Fragment>
    )
}

export default HumanGame