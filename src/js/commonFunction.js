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

export function createTrTable(array){
    let tr = createElement('tr',['something']);
    array.forEach((element)=>{
        tr.appendChild(createElement('td',['something'],'','',false,element));
    });
    return tr;
}

export function createWindow(createFields) {
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

export function updateLocalStrg(key, obj) {
  if (obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  }
}

export function makeClone(obj) {
    let clone = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if ("object"===typeof obj[prop])
                clone[prop] = makeClone(obj[prop]);
            else
                clone[prop] = obj[prop];
        }
    }
    return clone;
}


export function randomСoordinates() {
    let coordinates = {};
    coordinates.left = Math.floor(Math.random() * (450 + 1));
    coordinates.top = Math.floor(Math.random() * (450 + 1));
    return coordinates;
}