import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";
import {createSelect} from "./js/commonFunction";
import {createWindow} from "./js/commonFunction";

document.body.appendChild(Cardiologist.createField());
console.log(Dentist.createField());
console.log(Therapist.createField());

let checl = document.getElementById('check');
checl.addEventListener('click',function () {
    console.log(Cardiologist.findField());
});

document.querySelector('.header__create-btn').addEventListener('click', event => {
    document.body.prepend(createWindow(function () {
        const elements = document.createElement('fragment');
        elements.appendChild(createSelect());
        elements.appendChild(Cardiologist.createField());
        return elements;
    }));
});


