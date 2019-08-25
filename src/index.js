let heightZIndex = 9;
let globalObjectCards = {};
let tableEmpty;
let board;
let dragged;
let shiftX;
let shiftY;

window.addEventListener('load',function () {
    board=document.getElementById('board');

    tableEmpty = document.getElementById('emptyBoard');

    board.addEventListener('dragover', dragOver);
    board.addEventListener('drop', dragDrop);

    Visit.restoreCards();

    document.querySelector('.header__create-btn').addEventListener('click', function () {
        document.body.prepend(createWindow(function () {
            return Visit.createSelect();
        }));
    });
});

function getCoords(elem) {
    const coords = elem.getBoundingClientRect();
    return {
        top: coords.top + pageYOffset,
        left: coords.left + pageXOffset
    };
}

function dragOver(event) {
    event.preventDefault();
}

function dragDrop(event) {
    const board = document.getElementById('board');
    dragged.style.left = event.pageX - board.offsetLeft - shiftX + 'px';
    dragged.style.top = event.pageY - board.offsetTop - shiftY + 'px';
    globalObjectCards[dragged.id].position = {left: dragged.style.left, top: dragged.style.top};
    updateLocalStrg('globalObjectCards',globalObjectCards);
}

function createElement(tag,classCSSArray=[], id="", placeHolder="",required =false,text ="") {
    if(tag){
        let element = document.createElement(tag);
        if(Array.isArray(classCSSArray)){
            classCSSArray.forEach((classCSS)=>{
                element.classList.add(classCSS);
            });
            if(id){
                element.id = id;
            }
            if(placeHolder){
                element.placeholder = placeHolder;
            }
            if(required){
                element.required = required;
            }
            if(text){
                element.innerHTML = text;
            }
            if(tag.toUpperCase()==="textarea".toUpperCase()){
                element.onpaste = function () {
                    return false;
                };
                element.setAttribute('maxlength',"400");
            }
        }else {
            throw Error('didn\'t pass array classes css')
        }
        return element;
    }else {
        throw Error('didn’t pass tag')
    }
}

function createTrTable(array){
    let tr = createElement('tr',['tr']);
    array.forEach((element)=>{
        tr.appendChild(createElement('td',['td'],'','',false,element));
    });
    return tr;
}

function createWindow(createFields) {
    const dialogWrap = createElement('div',['dialog'],'dialog');
    dialogWrap.style.height =  document.documentElement.scrollHeight + 'px';
    const dialogWindow = createElement('div',['dialog__window']);
    const dialogClose = createElement('span',['dialog__close'],"","",false,'&#10006');
    dialogWrap.appendChild(dialogWindow);
    dialogWindow.appendChild(dialogClose);

    dialogClose.after(createFields());

    dialogWrap.addEventListener('click', event => {
        if (event.target === event.currentTarget || event.target === dialogClose) {
            event.currentTarget.remove();
        }
    });

    return dialogWrap;
}

function updateLocalStrg(key, obj) {
    if (obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    }
}

class Visit {
    constructor(firstName, lastName, middleName, purposeVisit,additionalComments,visitDate, id, position) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.purposeVisit = purposeVisit;
        this.visitDate =visitDate;
        this.additionalComments = additionalComments;
        this.id = id;
        this.position = position;
    }

    static createField(){
        let fragment = document.createDocumentFragment();
        fragment.appendChild(createElement('input',['form__input'],'firstName','Enter your first name', true));
        fragment.appendChild(createElement('input',['form__input'],'lastName','Enter your last name', true));
        fragment.appendChild(createElement('input',['form__input'],'middleName','Enter your middle name', true));
        fragment.appendChild(createElement('input',['form__input'],'purposeVisit','Purpose of the visit', true));
        fragment.appendChild(createElement('p',['form__text'],'','',false,"Indicate date"));
        let date = createElement('input',['form__input'],'visitDate','',true);
        date.setAttribute('type','date');
        fragment.appendChild(date);
        return fragment;
    }

    static findField(){
        let result={};
        result.firstName = document.getElementById('firstName').value;
        result.lastName = document.getElementById('lastName').value;
        result.middleName = document.getElementById('middleName').value;
        result.purposeVisit = document.getElementById('purposeVisit').value;
        result.visitDate = document.getElementById('visitDate').value;
        result.additionalComments = document.getElementById('additionalComments').value;
        return result
    }

    createLineAboutYourself(){
        let table = createElement('table',['table']);
        table.appendChild(createTrTable(['First name',this.firstName]));
        table.appendChild(createTrTable(['Last name',this.lastName]));
        table.appendChild(createTrTable(['Middle name',this.middleName]));
        table.appendChild(createTrTable(['Purpose of the visit',this.purposeVisit]));
        table.appendChild(createTrTable(["Data of visit",this.visitDate]));
        return table;
    }

    static randomId() {
        return `f${(+new Date).toString(16)}`;
    }

    static createSelect(){
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

            let form = createElement('form',['form']);
            let submit = createElement('input',['form__submit']);
            submit.setAttribute('type','submit');
            submit.value = 'Create the card';
            if(this.value==="Therapist"){
                form.appendChild(Therapist.createField());
            }else if(this.value==="Cardiologist"){
                form.appendChild(Cardiologist.createField());
            }else if(this.value==='Dentist'){
                form.appendChild(Dentist.createField());
            }

            form.addEventListener('submit',function (event) {
                let selected =  dialogSelect.options[dialogSelect.selectedIndex].value;


                let foundInform;
                let id = Visit.randomId();


                if(selected==="Therapist"){
                    foundInform = Therapist.findField();
                    globalObjectCards[id] = new Therapist(foundInform['purposeVisit'],foundInform['age'],foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate'], id);
                }else if(selected==="Cardiologist") {
                    foundInform = Cardiologist.findField();
                    globalObjectCards[id] = new Cardiologist(foundInform['purposeVisit'],foundInform['normalPressure'],foundInform['bodyMassIndex'], foundInform['pastIllnesses'],foundInform['age'], foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate'], id);
                }else if(selected==='Dentist'){
                    foundInform = Dentist.findField();
                    globalObjectCards[id] = new Dentist(foundInform['purposeVisit'],foundInform['lastVisit'],foundInform['firstName'], foundInform['lastName'], foundInform['middleName'], foundInform['additionalComments'], foundInform['visitDate'], id);
                }else {
                    event.preventDefault();
                }


                updateLocalStrg('globalObjectCards',globalObjectCards);
                board.appendChild(globalObjectCards[id].renderСard());

                let removeWindow = document.getElementById('dialog');
                removeWindow.remove();

                event.preventDefault();
            });

            form.appendChild(submit);
            containerInputs.appendChild(form);
        });

        fragment.appendChild(dialogSelect);
        fragment.appendChild(containerInputs);

        return fragment;
    }

    static restoreCards(){
        let localStorg = localStorage.getItem('globalObjectCards');

        if(localStorg!=='{}'|| !localStorg){
            localStorg = JSON.parse(localStorg);

            for(let id in localStorg){
                if(localStorg[id]['nameDoctor'] ==="Therapist"){
                    globalObjectCards[id] = new Therapist(localStorg[id]['purposeVisit'],localStorg[id]['age'],localStorg[id]['firstName'], localStorg[id]['lastName'], localStorg[id]['middleName'], localStorg[id]['additionalComments'], localStorg[id]['visitDate'], localStorg[id]['id'], localStorg[id]['position']);
                }else if(localStorg[id]['nameDoctor'] ==="Cardiologist") {
                    globalObjectCards[id] = new Cardiologist(localStorg[id]['purposeVisit'],localStorg[id]['normalPressure'],localStorg[id]['bodyMassIndex'], localStorg[id]['pastIllnesses'],localStorg[id]['age'], localStorg[id]['firstName'], localStorg[id]['lastName'], localStorg[id]['middleName'], localStorg[id]['additionalComments'], localStorg[id]['visitDate'], localStorg[id]['id'], localStorg[id]['position']);
                }else if(localStorg[id]['nameDoctor'] ==='Dentist'){
                    globalObjectCards[id] = new Dentist(localStorg[id]['purposeVisit'],localStorg[id]['lastVisit'],localStorg[id]['firstName'], localStorg[id]['lastName'], localStorg[id]['middleName'], localStorg[id]['additionalComments'], localStorg[id]['visitDate'], localStorg[id]['id'], localStorg[id]['position']);
                }
                board.appendChild(globalObjectCards[id].renderСard());
            }
        }
    }

    renderСard () {
        if(board.contains(tableEmpty)){
            tableEmpty.remove();
        }

        let id = this.id;
        let card = createElement('div',['card'],id);

        addEventListener('dragstart',function(event){
            dragged = event.target;
            dragged.style.position = 'absolute';
            dragged.style.zIndex = `${heightZIndex++}`;
            shiftX = event.pageX - getCoords(dragged).left;
            shiftY = event.pageY - getCoords(dragged).top;
        });

        card.addEventListener('click',function () {
            this.style.zIndex = `${heightZIndex++}`;
        });

        if (globalObjectCards[id]['position']) {
            card.style.position = 'absolute';
            card.style.left =  globalObjectCards[id].position.left;
            card.style.top = globalObjectCards[id].position.top;
        }

        let buttonClose = createElement('button',["card__delete"]);
        buttonClose.innerHTML="Delete";
        buttonClose.addEventListener('click',function () {
            globalObjectCards[id].removeCardAndObject();
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
                return  globalObjectCards[id].createLineAboutYourself();
            }));
        });

        card.appendChild(buttonAdditionInf);
        card.draggable=true;
        return card;
    }

    removeCardAndObject(){
        delete globalObjectCards[this.id];
        updateLocalStrg('globalObjectCards',globalObjectCards);
        document.querySelector(`#${this.id}`).remove();
        if (!globalObjectCards[this.id]) {
            document.body.appendChild(createWindow(function () {
                const message = createElement('p', ['dialog__message']);
                message.innerText = 'Deleted successfully';
                return message;
            }));
        }
        if(!board.contains(document.querySelector('.card'))){
            board.appendChild(tableEmpty);
        }
    }
}

class Cardiologist extends Visit{
    constructor(purposeVisit,normalPressure,bodyMassIndex, pastIllnesses,age, firstName, lastName, middleName, additionalComments,visitDate, id, position){
        super(firstName, lastName, middleName, purposeVisit, additionalComments,visitDate, id, position);
        this.nameDoctor = "Cardiologist";
        this.age=age;
        this.normalPressure = normalPressure;
        this.bodyMassIndex = bodyMassIndex;
        this.pastIllnesses = pastIllnesses;

    }

    static createField() {
        let fragment = super.createField();
        let age =createElement('input',['form__input'],'age','Enter your age', true);
        age.setAttribute('type','number');
        fragment.appendChild(age);
        fragment.appendChild(createElement('input',['form__input'],'normalPressure','Enter your normal pressure', true));
        fragment.appendChild(createElement('input',['form__input'],'bodyMassIndex','Enter your body mass index', true));
        fragment.appendChild(createElement('input',['form__input'],'pastIllnesses','Enter your past diseases of the cardiovascular system', true));
        fragment.appendChild(createElement('textarea', ['form__input','form__textarea'],'additionalComments','Enter comments'));
        return fragment;
    }

    static findField() {
        let result = super.findField();
        result.age=document.getElementById('age').value;
        result.normalPressure=document.getElementById('normalPressure').value;
        result.bodyMassIndex=document.getElementById('bodyMassIndex').value;
        result.pastIllnesses=document.getElementById('pastIllnesses').value;
        return result
    }

    createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Age',this.age]));
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Normal pressure',this.normalPressure]));
        table.appendChild(createTrTable(['Body mass index',this.bodyMassIndex]));
        table.appendChild(createTrTable(['Past diseases of the cardiovascular system',this.pastIllnesses]));
        table.appendChild(createTrTable(['Comments',this.additionalComments?this.additionalComments:'No comments']));
        return table;
    }
}

class Dentist extends Visit{
    constructor(purposeVisit,lastVisit,firstName, lastName, middleName, additionalComments,visitDate, id, position){
        super(firstName, lastName, middleName, purposeVisit, additionalComments,visitDate, id, position);
        this.lastVisit = lastVisit;
        this.nameDoctor = "Dentist";
    }

    static createField() {
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['form__input'],'lastVisit','Enter date of last visit', true));
        fragment.appendChild(createElement('textarea', ['form__input','form__textarea'],'additionalComments','Enter comments'));
        return fragment;
    }

    static findField() {
        let result = super.findField();
        result.lastVisit = document.getElementById("lastVisit").value;
        return result;
    }

    createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Last visit',this.lastVisit]));
        table.appendChild(createTrTable(['Comments',this.additionalComments?this.additionalComments:'No comments']));
        return table;
    }
}

class Therapist extends Visit {
    constructor(purposeVisit,age,firstName, lastName, middleName, additionalComments,visitDate, id, position){
        super(firstName, lastName, middleName, purposeVisit, additionalComments,visitDate, id, position);
        this.age=age;
        this.nameDoctor = "Therapist";

    }

    static createField(){
        let fragment = super.createField();
        let age =createElement('input',['form__input'],'age','Enter your age', true);
        age.setAttribute('type','number');
        fragment.appendChild(age);
        fragment.appendChild(createElement('textarea', ['form__input','form__textarea'],'additionalComments','Enter comments'));
        return fragment;
    }

    static findField() {
        let result = super.findField();
        result.age = document.getElementById('age').value;
        return result
    }

    createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Age',this.age]));
        table.appendChild(createTrTable(['Comments',this.additionalComments?this.additionalComments:'No comments']));
        return table;
    }

}
