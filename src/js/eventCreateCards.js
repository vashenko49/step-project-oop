import {createElement, createWindow} from "./commonFunction";
import {Therapist} from "./Classes/Therapist";
import {Cardiologist} from "./Classes/Cardiologist";
import {Dentist} from "./Classes/Dentist";


export function putCreateButton(event) {
    document.body.prepend(createWindow(function () {
        return createSelect();
    }));
}


function createSelect(){
    let fragment = document.createDocumentFragment();

    const dialogSelect = createElement('select',["dialog__doctor"]);
    let dialogSelectDefault = createElement('option',[],"","",false,"Doctor");
    dialogSelectDefault.setAttribute("selected", "selected");
    dialogSelectDefault.disabled = true;
    dialogSelectDefault.selected = true;
    dialogSelect.appendChild(dialogSelectDefault);

    const dialogSelectOpt = createElement('option',[],"","",false,"Cardiologist");
    dialogSelectOpt.value='Cardiologist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.value='Dentist';
    dialogSelectOpt.innerText = 'Dentist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.value='Therapist';
    dialogSelectOpt.innerText = 'Therapist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));

    let containerInputs = createElement('div',['something']);
    containerInputs.appendChild(createElement('p',['something'],'','',false,'select doctor'));


    dialogSelect.addEventListener('change',function () {

        while (containerInputs.firstChild) {
            containerInputs.removeChild(containerInputs.firstChild);
        }

        let fomr = createElement('form',['something']);
        let submit = createElement('input',['something']);
        submit.setAttribute('type','submit');
        submit.value = 'Create';
        if(this.value==="Therapist"){
            fomr.appendChild(Therapist.createField.call(this));
        }else if(this.value==="Cardiologist"){
            fomr.appendChild(Cardiologist.createField.call(this));

        }else if(this.value==='Dentist'){
            fomr.appendChild(Dentist.createField.call(this));
        }

        fomr.appendChild(submit);
        containerInputs.appendChild(fomr);
    });


    fragment.appendChild(dialogSelect);
    fragment.appendChild(containerInputs);

    return fragment;
}
