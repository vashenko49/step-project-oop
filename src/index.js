import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";
import {generationСard} from "./js/cards";
import {putCreateButton} from "./js/eventCreateCards";
export let globalObjectCards = {};

globalObjectCards['test']= new Therapist('gogo','gogo','name','last','middle','fadssd');
globalObjectCards['df']= new Cardiologist('gogo','gogo','name','last','middle','fadssd','asd','sdfsdf','sdfsdf');
globalObjectCards['qqq'] = new Dentist('gogo','gogo','name','last','middle','dentist');

let board;



window.addEventListener('load',function () {
    board=document.getElementById('board');
    board.appendChild(generationСard('test'));
    board.appendChild(generationСard('df'));
    board.appendChild(generationСard('qqq'));
});

document.querySelector('.header__create-btn').addEventListener('click', putCreateButton);
