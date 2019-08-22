import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";
import {createElement, createSelect, updateLocalStrg} from "./js/commonFunction";
import {createWindow} from "./js/commonFunction";
import {generationСard} from "./js/cards";
import {randomId} from "./js/commonFunction";
import {dragStart} from "./js/DragAndDrop";
import {dragOver} from "./js/DragAndDrop";
import {dragDrop} from "./js/DragAndDrop";
export let globalObjectCards = {};

let board;
globalObjectCards['test']= new Therapist('gogo','gogo','name','last','middle','fadssd');
updateLocalStrg('cards', globalObjectCards);
let card = generationСard('test');

window.addEventListener('load',function () {
    board=document.getElementById('board');
    board.appendChild(card);
    board.appendChild(card.cloneNode(true));
    board.addEventListener('dragstart', dragStart);
    board.addEventListener('dragover', dragOver);
    board.addEventListener('drop', dragDrop);
});

document.querySelector('.header__create-btn').addEventListener('click', event => {
    document.body.prepend(createWindow(function () {
        const elements = document.createElement('fragment');
        elements.appendChild(createSelect());
        elements.appendChild(Cardiologist.createField());
        return elements;
    }));
});

let car = Cardiologist.createField();
let den = Dentist.createField();
let ther = Therapist.createField();

