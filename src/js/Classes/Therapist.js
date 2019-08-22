import {Visit} from "./Visit";
import {createElement, createTrTable} from "../commonFunction";

export class Therapist extends Visit {
    constructor(purposeVisit,age,firstName, lastName, middleName, additionalComments){
        super(firstName, lastName, middleName, purposeVisit, additionalComments);
        this.age=age;
        this.nameDoctor = "Therapist";
    }
    static createField(){
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['form__input'],'age',"Enter your age",true));
        fragment.appendChild(createElement('textarea', ['form__input','form__textarea'],'additionalComments','Enter comments'));
        return fragment;
    }
    static findField() {
        let result = super.findField();
        result.age = document.getElementById('age').value;
        return result
    }
    static createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Age',this.age]));
        table.appendChild(createTrTable(['Comments',this.additionalComments]));
        return table;
    }
}