import {createElement, createTrTable} from "../commonFunction";

export class Visit {
    constructor(firstName, lastName, middleName, purposeVisit,additionalComments,visitDate ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.purposeVisit = purposeVisit;
        this.visitDate =visitDate;
        this.additionalComments = additionalComments;
    }

    static createField(){
        let fragment = document.createDocumentFragment();
        fragment.appendChild(createElement('input',['form__input'],'firstName','Enter your first name', true));
        fragment.appendChild(createElement('input',['form__input'],'lastName','Enter your last name', true));
        fragment.appendChild(createElement('input',['form__input'],'middleName','Enter your middle name', true));
        fragment.appendChild(createElement('input',['form__input'],'purposeVisit','Purpose of the visit', true));
        fragment.appendChild(createElement('p',['form__text'],'','',false,"Indicate date"));
        let date = createElement('input',['form__input'],'visitDate','',true);
        date.setAttribute('type','date');
        fragment.appendChild(date);
        return fragment;
    }
    static findField(){
        let result={};
        result.firstName = document.getElementById('firstName').value;
        result.lastName = document.getElementById('lastName').value;
        result.middleName = document.getElementById('middleName').value;
        result.purposeVisit = document.getElementById('purposeVisit').value;
        result.visitDate = document.getElementById('visitDate').value;
        result.additionalComments = document.getElementById('additionalComments').value;
        return result
    }
    static createLineAboutYourself(){
        let table = createElement('table',['table']);
        table.appendChild(createTrTable(['First name',this.firstName]));
        table.appendChild(createTrTable(['Last name',this.lastName]));
        table.appendChild(createTrTable(['Middle name',this.middleName]));
        table.appendChild(createTrTable(['Purpose of the visit',this.purposeVisit]));
        table.appendChild(createTrTable(["Data of visit",this.visitDate.replace(/-/g,'.')]));
        return table;
    }

}





