import {createElement, createWindow, randomId, updateLocalStrg} from "./commonFunction";
import {Therapist} from "./Classes/Therapist";
import {Cardiologist} from "./Classes/Cardiologist";
import {Dentist} from "./Classes/Dentist";
import {generationСard} from "./cards";
import {globalObjectCards, tableEmpty} from "../index";


export function putCreateButton(event) {
    document.body.prepend(createWindow(function () {
        return createSelect();
    }));
}


//все в куче потому что туту очень важен контекст выполение событий, все сдлеанно на замыкании что бы не заводить очень много переменных
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
    containerInputs.appendChild(createElement('p',['selectDoctor'],'','',false,'select doctor'));



    dialogSelect.addEventListener('change',function () {

        while (containerInputs.firstChild) {
            containerInputs.removeChild(containerInputs.firstChild);
        }

        let fomr = createElement('form',['form']);
        let submit = createElement('input',['form__submit']);
        submit.setAttribute('type','submit');
        submit.value = 'Create the card';
        if(this.value==="Therapist"){
            fomr.appendChild(Therapist.createField.call(this));
        }else if(this.value==="Cardiologist"){
            fomr.appendChild(Cardiologist.createField.call(this));
        }else if(this.value==='Dentist'){
            fomr.appendChild(Dentist.createField.call(this));
        }

        fomr.addEventListener('submit',function (event) {
            let selected =  dialogSelect.options[dialogSelect.selectedIndex].value;

            let board=document.getElementById('board');
            if(board.contains(tableEmpty)){
                tableEmpty.remove();
            }

            let foundInform;
            let id = randomId();

            if(selected==="Therapist"){
                foundInform = Therapist.findField();
                globalObjectCards[id] = new Therapist(foundInform['purposeVisit'],foundInform['age'],foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate']);
            }else if(selected==="Cardiologist") {
                foundInform = Cardiologist.findField();
                globalObjectCards[id] = new Cardiologist(foundInform['purposeVisit'],foundInform['normalPressure'],foundInform['bodyMassIndex'], foundInform['pastIllnesses'],foundInform['age'], foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate']);
            }else if(selected==='Dentist'){
                foundInform = Dentist.findField();
                globalObjectCards[id] = new Dentist(foundInform['purposeVisit'],foundInform['lastVisit'],foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate']);
            }else {
                event.preventDefault();
            }


            updateLocalStrg('globalObjectCards',globalObjectCards);
            board.appendChild(generationСard(id));


            let removeWindow = document.getElementById('dialog');
            removeWindow.remove();

            event.preventDefault();
       });

        fomr.appendChild(submit);
        containerInputs.appendChild(fomr);
    });



    fragment.appendChild(dialogSelect);
    fragment.appendChild(containerInputs);

    return fragment;
}


