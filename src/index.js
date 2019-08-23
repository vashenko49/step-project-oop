import {putCreateButton} from "./js/eventCreateCards";
import {generationСard} from "./js/cards";
import {makeClone} from "./js/commonFunction";
import {dragDrop, dragOver, dragStart} from "./js/DragAndDrop";

export let heightZIndex = 9;
export let globalObjectCards = {};
export let tableEmpty;
export let board;

window.addEventListener('load',function () {
    board=document.getElementById('board');

    tableEmpty = document.getElementById('emptyBoard');

    board.addEventListener('dragstart', dragStart);
    board.addEventListener('dragover', dragOver);
    board.addEventListener('drop', dragDrop);


    let localStorg = localStorage.getItem('globalObjectCards');

    if(localStorg!=='{}'|| !localStorg){
        localStorg = JSON.parse(localStorg);

        for(let id in localStorg){
            globalObjectCards[id] = makeClone(localStorg[id]);
            board.appendChild(generationСard(id));
            if(board.contains(tableEmpty)){
                tableEmpty.remove();
            }
        }
    }
});



document.querySelector('.header__create-btn').addEventListener('click', putCreateButton);
