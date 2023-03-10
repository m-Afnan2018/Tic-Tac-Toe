let temp;

let API_KEY='l1djoFSAX4H4O3z0n_W-TDZU3os4RdG82CDBEA8aAeU';
let URL='https://api.unsplash.com/photos/random?query=dark&';

const gameStatus = document.querySelector('#status');
const BG = document.querySelector('#wrapper');
const changeBG = document.querySelector('#changeBackground');
const game   = document.querySelector('.game');
const cell   = document.querySelectorAll('.cell');
const cell_1 = document.querySelector('#cell-1');
const cell_2 = document.querySelector('#cell-2');
const cell_3 = document.querySelector('#cell-3');
const cell_4 = document.querySelector('#cell-4');
const cell_5 = document.querySelector('#cell-5');
const cell_6 = document.querySelector('#cell-6');
const cell_7 = document.querySelector('#cell-7');
const cell_8 = document.querySelector('#cell-8');
const cell_9 = document.querySelector('#cell-9');
const newGame= document.querySelector('#newGame');

let allPossible=[[0, 1, 2], [0, 3, 6], [0, 4, 8], [3, 4, 5], [1, 4, 7], [2, 4, 6], [6, 7, 8], [2, 5, 8]];
let currGame=['', '', '', '', '', '', '', '', ''];

let curr='X';

cell.forEach((element, index)=>{
    element.addEventListener('click', ()=>{clicked(index, element)})
})

newGame.addEventListener('click', clear);

function clicked(index, cell){
    if(currGame[index]===''){
        currGame[index]=curr;
        cell.setAttribute('style', 'cursor:default');
        if(curr=='X'){
            cell.innerText=curr;
            curr='O';
        }
        else{
            cell.innerText=curr;
            curr='X';
        }
        checkWinner();
    }
}

function clear(){
    cell.forEach((index)=>{index.innerText=''});
    currGame.forEach((element, index)=>{currGame[index]=''});
    newGame.removeAttribute('style');
    gameStatus.innerText=`Current Player - ${curr}`;
    for(element of cell){
        element.classList.remove('winner');
        element.removeAttribute('style');
    }
    game.classList.remove('loser');
}

function checkWinner(){
    gameStatus.innerText=`Current Player - ${curr}`;
    let winner='';
    for(way of allPossible){
        if(currGame[way[0]]!='' && currGame[way[0]]===currGame[way[1]] && currGame[way[1]]===currGame[way[2]]){
            winner=currGame[way[0]];
            cell[way[0]].classList.add('winner');
            cell[way[1]].classList.add('winner');
            cell[way[2]].classList.add('winner');
            break;
        }
    }

    if(winner!=''){
        winnerFound(winner);
        return;
    }

    for(let i=0; i<9; i++){
        if(currGame[i]==''){
            return;
        }
    }

    winnerNotFound();
}

function winnerFound(winner){
    gameStatus.innerText=`Winner - ${winner}`;
    disableGame();
}

function winnerNotFound(){
    gameStatus.innerText=`Game Tie`;
    game.classList.add('loser');
    disableGame();
}

function disableGame(){
    currGame.forEach((element, index)=>{currGame[index]='X'});
    newGame.setAttribute('style', 'opacity:1; pointer-events:all;');
    for(element of cell){
        element.setAttribute('style', 'cursor:default');
    }
}

changeBG.addEventListener('click', changeBackground)

async function changeBackground(){
    let imageJson=await fetch(`${URL}client_id=${API_KEY}`);
    let imageURL=await imageJson.json();
    imageURL=imageURL?.urls?.regular;
    BG.removeAttribute('style');
    BG.setAttribute('style', `background-image: url('${imageURL}');`);
}