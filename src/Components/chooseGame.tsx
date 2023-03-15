import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './chooseGame.css';

function ChooseGame(){
    const nav = useNavigate();
    function LinkHuman(){
        console.log("bruh")
        nav('../humanGame', { replace: true })
    }
    function LinkComputer(){
        console.log("bruh")
        nav('../compGame', { replace: true })
    }
    return (
        <React.Fragment>
            <h1 id ="Name">Tic Tac Toe</h1>
            <h4 id="choosePlayer">Choose your Opponent</h4>
            <h5 id="Csoto">By Carlodavid Soto</h5>
                <button onClick={LinkHuman} id="Vhuman">Play Versus Human</button>
                <button onClick={LinkComputer} id="Vcomp">Play Versus Computer</button>
    
        </React.Fragment>
    )
}
export default ChooseGame
