import {Visit} from "./Visit";
import {createElement, createTrTable} from "../commonFunction";

export class Dentist extends Visit{
    constructor(purposeVisit,lastVisit,firstName, lastName, middleName, additionalComments){
        super(firstName, lastName, middleName, purposeVisit, additionalComments);
        this.lastVisit = lastVisit;
        this.nameDoctor = "Dentist";
    }
    static createField() {
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['something'],'lastVisit','Enter date of last visit', true));
        fragment.appendChild(createElement('textarea', ['something'],'additionalComments','Enter comments'));
        return fragment;
    }
    static findField() {
        let result = super.findField();
        result.lastVisit = document.getElementById("lastVisit").value;
        return result;
    }
    static createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Last visit',this.lastVisit]));
        table.appendChild(createTrTable(['Comments',this.additionalComments]));
        return table;
    }
}