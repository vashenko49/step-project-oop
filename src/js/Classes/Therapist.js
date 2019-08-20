import {Visit} from "./Visit";
import {createElement} from "../commonFunction";

export class Therapist extends Visit {
    constructor(purposeVisit,age,firstName, lastName, middleName){
        super(firstName, lastName, middleName, purposeVisit);
        this.age=age;
    }
    static createField(){
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['something'],'age',true));
        fragment.appendChild(createElement('textarea', ['something'],'additionalComments','Enter comments'));
        return fragment;
    }
    static findField() {
        let result = super.findField();
        result.age=document.getElementById('age').value;
        return result
    }
}