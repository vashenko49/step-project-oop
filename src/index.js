import {putCreateButton} from "./js/eventCreateCards";
import {generationСard} from "./js/cards";
import {makeClone} from "./js/commonFunction";
export let globalObjectCards = {};


window.addEventListener('load',function () {
    let board=document.getElementById('board');

    let localStorg = localStorage.getItem('globalObjectCards');

    if(localStorg!=='{}'|| !localStorg){
        localStorg = JSON.parse(localStorg);

        for(let id in localStorg){
            globalObjectCards[id] = makeClone(localStorg[id]);
            board.appendChild(generationСard(id));
        }
    }
});

document.querySelector('.header__create-btn').addEventListener('click', putCreateButton);
