import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";
import {createSelect} from "./js/commonFunction";
import {createWindow} from "./js/commonFunction";
import {generationСard} from "./js/cards";
import {randomId} from "./js/commonFunction";
export let globalObjectCards = {};

globalObjectCards['test']= new Therapist('gogo','gogo','name','last','middle','fadssd');

let board;



window.addEventListener('load',function () {
    board=document.getElementById('board');
    let card = generationСard('test');
    board.appendChild(card);
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

