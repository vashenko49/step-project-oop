import {Visit} from "./Visit";
import {createElement} from "./commonFunction";

export class Dentist extends Visit{
    constructor(purposeVisit,lastVisit,firstName, lastName, middleName){
        super(firstName, lastName, middleName, purposeVisit);
        this.lastVisit = lastVisit;
    }
    static createField() {
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['something'],'lastVisit','Enter date of last visit', true));
        fragment.appendChild(createElement('textarea', ['something'],'additionalComments','Enter comments'));
        return fragment;
    }
    static findField() {
        let result = super.findField();
        result.lastVisit = document.getElementById(lastVisit).value;
        return result

    }
}