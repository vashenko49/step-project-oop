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
