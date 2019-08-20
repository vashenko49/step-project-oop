import {Cardiologist} from "./js/Classes/Cardiologist";
import {Dentist} from "./js/Classes/Dentist";
import {Therapist} from "./js/Classes/Therapist";

document.body.appendChild(Cardiologist.createField());
console.log(Dentist.createField());
console.log(Therapist.createField());

let checl = document.getElementById('check');
checl.addEventListener('click',function () {
    console.log(Cardiologist.findField());
});


