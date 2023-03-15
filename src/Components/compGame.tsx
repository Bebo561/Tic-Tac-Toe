import React from 'react';
import './game.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';

function CompGame(){
    var p1Ctr = 0;
    var compScore = 0;
    return (
        <React.Fragment>
            <Link to="/humanGame" id = "Redirect">Versus Human</Link>
            <h1 id ="p1">Player Wins- {p1Ctr}</h1>
            <h1 id = "p2">Computer Wins- {compScore}</h1>
                <div id = "game">
                    <div className="tile right-border bottom-border" id = "1"></div>
                    <div className="tile right-border bottom-border" id = "2"></div>
                    <div className="tile bottom-border" id = "3"></div>
                    <div className="tile right-border bottom-border" id = "4"></div>
                    <div className="tile right-border bottom-border" id = "5"></div>
                    <div className="tile bottom-border" id = "6"></div>
                    <div className="tile right-border" id = "7"></div>
                    <div className="tile right-border" id = "8"></div>
                    <div className="tile" id = "9"></div>
                    <div id="winningLine" className = "winningLine"></div>
                </div>
            <button id="restart">Restart</button>
        </React.Fragment>
    )
}
export default CompGame