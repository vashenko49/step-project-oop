export function createElement(tag,classCSSArray=[], id="", placeHolder="",required =false,text ="") {
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
        }else {
            throw Error('didn\'t pass array classes css')
        }
        return element;
    }else {
        throw Error('didn’t pass tag')
    }
}

export function randomId(){
    return `f${(+new Date).toString(16)}`
}

export function createWindow(createFields) {
    const dialogWrap = createElement('div',['dialog']);
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

export function createSelect() {
    const dialogSelect = createElement('select',["dialog__doctor"]);

    const dialogSelectOpt = createElement('option',[],"","",false,"Cardiologist");
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.innerText = 'Dentist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.innerText = 'Therapist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));

    return dialogSelect;
}