import {createElement} from "../commonFunction";

export class Visit {
    constructor(firstName, lastName, middleName, purposeVisit) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.purposeVisit = purposeVisit;
        this.additionalComments = "No comments"
    }
    static createField(){
        let fragment = document.createDocumentFragment();
        fragment.appendChild(createElement('input',['something'],'firstName','Enter your first name', true));
        fragment.appendChild(createElement('input',['something'],'lastName','Enter your last name', true));
        fragment.appendChild(createElement('input',['something'],'middleName','Enter your middle name', true));
        fragment.appendChild(createElement('input',['something'],'purposeVisit','Purpose of the visit', true));
        return fragment;
    }
    static findField(){
        let result={};
        result.firstName = document.getElementById('firstName').value;
        result.lastName = document.getElementById('lastName').value;
        result.middleName = document.getElementById('middleName').value;
        result.purposeVisit = document.getElementById('purposeVisit').value;
        result.additionalComments = document.getElementById('additionalComments').value;
        return result
    }
}




