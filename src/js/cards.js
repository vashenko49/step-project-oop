import {createElement} from "./commonFunction";
import {globalObjectCards} from "../index";
import {updateLocalStrg} from "./commonFunction";
import {createWindow} from "./commonFunction";

export function generationСard (id) {
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
        /**
         * сгенерить диалоговое окно с информацие про карточку
         */
        console.log(globalObjectCards[id]);
    });

    card.appendChild(buttonAdditionInf);
    card.draggable=true;
    return card;
}
