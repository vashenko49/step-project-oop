import {createElement} from "./commonFunction";
import {globalObjectCards} from "../index";
import {updateLocalStrg} from "./commonFunction";
import {createWindow} from "./commonFunction";
import {Therapist} from "./Classes/Therapist";
import {Dentist} from "./Classes/Dentist";
import {Cardiologist} from "./Classes/Cardiologist";

export function generationСard (id) {
    console.log(id);
    let card = createElement('div',['card'],id);
    let buttonClose = createElement('button',["card__delete"]);
    buttonClose.innerHTML="Delete";
    buttonClose.addEventListener('click',function () {
        delete globalObjectCards[id];
        card.remove();
        updateLocalStrg('cards', globalObjectCards);
        if (!globalObjectCards[id]) {
            document.body.appendChild(createWindow(function () {
                const message = createElement('p', ['dialog__message']);
                message.innerText = 'Deleted successfully';
                return message;
            }));
        }
    });
    card.appendChild(buttonClose);
    if(globalObjectCards[id]){
        card.appendChild(createElement('p',['card__item'],"","",false,globalObjectCards[id]['firstName']));
        card.appendChild(createElement('p',['card__item'],"","",false,globalObjectCards[id]['lastName']));
        card.appendChild(createElement('p',['card__item'],"","",false,globalObjectCards[id]['middleName']));
        card.appendChild(createElement('p',['card__item'],"","",false,globalObjectCards[id]['nameDoctor']));
    }else {
        throw Error("not found id")
    }

    let buttonAdditionInf = createElement('button',['card__more']);
    buttonAdditionInf.innerHTML = "Показать больше";

    buttonAdditionInf.addEventListener('click',function () {
                console.log('be');
        console.log(id);
        document.body.appendChild(createWindow(function () {
            if(globalObjectCards[id]['nameDoctor'] === "Therapist"){
                return Therapist.createLineAboutYourself.call(globalObjectCards[id]);
            }else if(globalObjectCards[id]['nameDoctor'] === "Dentist"){
                return Dentist.createLineAboutYourself.call(globalObjectCards[id]);
            }else if(globalObjectCards[id]['nameDoctor'] === "Cardiologist"){
                return Cardiologist.createLineAboutYourself.call(globalObjectCards[id])
            }
            else {
                return createElement('p',[],'','',false,'not found')
            }
        }));
    });

    card.appendChild(buttonAdditionInf);
    card.draggable=true;
    return card;
}
