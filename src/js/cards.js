import {createElement, randomСoordinates} from "./commonFunction";
import {board, globalObjectCards, heightZIndex, tableEmpty} from "../index";
import {updateLocalStrg} from "./commonFunction";
import {createWindow} from "./commonFunction";
import {Therapist} from "./Classes/Therapist";
import {Dentist} from "./Classes/Dentist";
import {Cardiologist} from "./Classes/Cardiologist";

export function generationСard (id) {
    let card = createElement('div',['card'],id);

    card.addEventListener('click',function () {
        this.style.zIndex = `${heightZIndex++}`
    });

    let randmCoord = randomСoordinates();
    card.style.position = 'absolute';
    card.style.left =  `${randmCoord.left}px`;
    card.style.top = `${randmCoord.top}px`;

    let buttonClose = createElement('button',["card__delete"]);
    buttonClose.innerHTML="Delete";
    buttonClose.addEventListener('click',function () {
        delete globalObjectCards[id];
        updateLocalStrg('globalObjectCards',globalObjectCards);
        card.remove();
        if (!globalObjectCards[id]) {
            document.body.appendChild(createWindow(function () {
                const message = createElement('p', ['dialog__message']);
                message.innerText = 'Deleted successfully';
                return message;
            }));
        }
        if(!board.contains(document.querySelector('.card'))){
            board.appendChild(tableEmpty);
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
    buttonAdditionInf.innerHTML = "Show more";

    buttonAdditionInf.addEventListener('click',function () {
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





