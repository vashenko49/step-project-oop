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