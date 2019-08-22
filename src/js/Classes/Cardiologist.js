import {Visit} from "./Visit";
import {createElement, createTrTable} from "../commonFunction";


export class Cardiologist extends Visit{
    constructor(purposeVisit,normalPressure,bodyMassIndex, pastIllnesses,age, firstName, lastName, middleName, additionalComments){
        super(firstName, lastName, middleName, purposeVisit, additionalComments);
        this.nameDoctor = "Cardiologist";
        this.age=age;
        this.normalPressure = normalPressure;
        this.bodyMassIndex = bodyMassIndex;
        this.pastIllnesses = pastIllnesses;

    }
    static createField() {
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['form__input'],'age','Enter your age', true));
        fragment.appendChild(createElement('input',['form__input'],'normalPressure','Enter your normal pressure', true));
        fragment.appendChild(createElement('input',['form__input'],'bodyMassIndex','Enter your body mass index', true));
        fragment.appendChild(createElement('input',['form__input'],'pastIllnesses','Enter your past diseases of the cardiovascular system', true));
        fragment.appendChild(createElement('textarea', ['form__input','form__textarea'],'additionalComments','Enter comments'));
        return fragment;
    }
    static findField() {
        let result = super.findField();
        result.age=document.getElementById('age').value;
        result.normalPressure=document.getElementById('normalPressure').value;
        result.bodyMassIndex=document.getElementById('bodyMassIndex').value;
        result.pastIllnesses=document.getElementById('pastIllnesses').value;
        return result
    }
    static createLineAboutYourself(){
        let table = super.createLineAboutYourself();
        table.appendChild(createTrTable(['Age',this.age]));
        table.appendChild(createTrTable(['Doctor',this.nameDoctor]));
        table.appendChild(createTrTable(['Normal pressure',this.normalPressure]));
        table.appendChild(createTrTable(['Body mass index',this.bodyMassIndex]));
        table.appendChild(createTrTable(['Past diseases of the cardiovascular system',this.pastIllnesses]));
        table.appendChild(createTrTable(['Comments',this.additionalComments]));
        return table;
    }
}