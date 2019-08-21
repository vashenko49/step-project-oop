import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";
import {generationСard} from "./js/cards";
import {randomId} from "./js/commonFunction";
export let globalObjectCards = {};

let board;
globalObjectCards['test']= new Therapist('gogo','gogo','name','last','middle','fadssd');
let card = generationСard('test');
document.body.appendChild(card);


window.addEventListener('load',function () {
    board=document.getElementById('board');

});

let car = Cardiologist.createField();
let den = Dentist.createField();
let ther = Therapist.createField();

