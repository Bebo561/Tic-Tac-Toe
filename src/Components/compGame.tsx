import React from 'react';
import './game.css';
import {Link} from 'react-router-dom';

function CompGame(){

    var p1Ctr = 0;
    var compScore = 0;
    var playerOne = 'X';
    var comp = 'O';

    let rand = Math.random();
    var currTurn = '';

    //Randomly sets what players turn it is.
    var gameOn = true;
    rand >= 0.5 ? currTurn = playerOne : currTurn = comp;

    //This array will be used to check if the game is a draw or a player has won.
    var clickedTiles = ['', '', '', '', '', '', '', '', ''];

    //Set that holds all currently open tiles for the computer to choose from.
    var openTiles = new Set<Number>;
    for(var i = 0; i < 9; i++){
        openTiles.add(i);
    }

    //Holds the winning combination of players, while also holding the matching winningLine to put on top of once done.
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

    //Handles the player change, and updates status bar to reflect who's turn it is.
    //If the current player is changed to the computer, then also call the computer's turn function.
    function ChangeTurn(){
        if(currTurn === playerOne){
            currTurn = comp;
            var p = document.getElementById('turn');
            if(p != null){
                p.innerHTML = `Turn - ${ currTurn}`;
            }
            compTurn();
            return;
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

    //Updates score in HTML depending on which player won
    function ScoreCtr(){
        if(currTurn === playerOne){
            p1Ctr++;
            var score = document.getElementById('p1');
            if(score !== null){
                score.innerHTML = `Player X Wins- ${p1Ctr}`;
            }
        }
        else{
            compScore++;
            var score = document.getElementById('p2');
            if(score !== null){
                score.innerHTML = `Computer O Wins- ${compScore}`;
            }
        }
    }

    //Checks to see if conditions for winning or a draw have been met. First checks if there has been a win, if there has been
    //sets the game to off and alerts the player of who won. If no win has been reached and the game is still on, yet all tiles 
    //in the open tile array are not empty, then alert the players there has been a draw and turn off the game.
    //Does not automatically reset the game, restart button click required.
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

    //On click, it first checks if the tile that the player chose already has been chosen before, if not it then checks if the
    //game is still active, and finally if the player is the human player. If none of these requirements are met, a player cannot
    //choose a tile. Once a tile is chosen, it updates the innerHTML of the tile, updates the clickedTiles array with the symbol
    //of the player, and deletes the index chose from the availible tiles set to prevent the copmuter from overwriting tiles.
    //It then checks if the game is over, and finally changes the turn of the players.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        var cell = e.currentTarget;
        console.log(currTurn)
        if(cell.innerHTML === "" && gameOn === true && currTurn === playerOne){
            var index = parseInt(e.currentTarget.id);
            clickedTiles[index-1] = currTurn;
            openTiles.delete(index-1);
            console.log(openTiles)
            cell = e.currentTarget
            cell.innerHTML = currTurn;
            GameEnd();
            ChangeTurn();
            return
        }
    };

    //On button click, restarts the game by emptying all of the tiles, setting all values in the clickTiles array back to empty,
    //and clearing the computers tile set. Reinitializes all the variables, removes the winningLine, and then randomly chooses a
    //player to start and updates the HTML accordingly. Also calls the computer's turn function if it is the computer's turn.
    function Restart(){
        clickedTiles = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.tile').forEach(tile => tile.innerHTML = '');
        var ran = Math.random();
        gameOn = true;
        var line = document.getElementById("winningLine");
        openTiles.clear();
        for(var i = 0; i < 9; i++){
            openTiles.add(i);
        }
        if(line !== null){
            line.className = 'winningLine';
        }
        ran >= 0.5 ? currTurn = playerOne : currTurn = comp;
        var p = document.getElementById('turn');
        if(p != null){
            p.innerHTML = `Turn - ${ currTurn}`;
        }
        if(currTurn === comp){
            compTurn()
        }
    }

    //Computer's turn function, checks first and foremost if the game is still ongoing. If the game is still ongoing, a timeout 
    //is set where the computer has a delayed response time of half a second. Firstly converts the openTiles set to an array,
    //then randomly picks an index from the array, then deletes the value from that index in the set. Then converts that
    //value to a string to prevent type problems, types that value into an index, and updates the index of the clickedTiles 
    //array to reflect the computer's symbol. Increments that index value by one since the index values represent the ID of the 
    //tile one greater then them, and then updates that tile with the computer's symbol. Finally, it checks if the game has
    //ended and then changes turn back to the player.
    async function compTurn(){
        if(gameOn){
         setTimeout(() => {
            var arr = Array.from(openTiles);
            var randomTile = arr[Math.floor(Math.random() * arr.length)];
            openTiles.delete(randomTile);
            
            var str = randomTile.toString();

            var index = parseInt(str);
            clickedTiles[index] = currTurn;
            index += 1;
            str = index.toString();
            let tile = document.getElementById(str);
            if(tile !== null){
                tile.innerHTML = currTurn;
            }
            GameEnd();
            ChangeTurn();
          }, 500);
        }
    }

    return (
        <React.Fragment>
            <Link to="/humanGame" id = "Redirect">Versus Human</Link>
            <h1 id ="p1">Player X Wins- {p1Ctr}</h1>
            <h1 id = "p2">Computer O Wins- {compScore}</h1>
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
export default CompGame