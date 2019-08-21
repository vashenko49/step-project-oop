export function createElement(tag,classCSSArray=[], id="", placeHolder="",required =false) {
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
        }else {
            throw Error('didn\'t pass array classes css')
        }
        return element;
    }else {
        throw Error('didn’t pass tag')
    }
}

export function createWindow(createFields) {
    const dialogWrap = document.createElement('div');
    const dialogWindow = document.createElement('div');
    const dialogClose = document.createElement('span');
    dialogWrap.appendChild(dialogWindow);
    dialogWindow.appendChild(dialogClose);

    dialogWrap.className = 'dialog';
    dialogWindow.className = 'dialog__window';
    dialogClose.className = 'dialog__close';
    dialogClose.innerHTML = '&#10006';

    dialogClose.after(createFields());

    dialogWrap.addEventListener('click', event => {
        if (event.target === event.currentTarget || event.target === dialogClose) {
            event.currentTarget.remove();
        }
    });

    return dialogWrap;
}

export function createSelect() {
    const dialogSelect = document.createElement('select');
    dialogSelect.className = 'dialog__doctor';

    const dialogSelectOpt = document.createElement('option');
    dialogSelectOpt.innerText = 'Cardiologist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.innerText = 'Dentist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.innerText = 'Therapist';
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));

    return dialogSelect;
}