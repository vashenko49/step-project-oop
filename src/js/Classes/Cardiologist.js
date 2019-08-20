import {Visit} from "./Visit";
import {createElement} from "../commonFunction";


export class Cardiologist extends Visit{
    constructor(purposeVisit,normalPressure,bodyMassIndex, pastIllnesses,age, firstName, lastName, middleName){
        super(firstName, lastName, middleName, purposeVisit);
        this.nameDoctor = "Кардиолог";
        this.age=age;
        this.normalPressure = normalPressure;
        this.bodyMassIndex = bodyMassIndex;
        this.pastIllnesses = pastIllnesses;

    }
    static createField() {
        let fragment = super.createField();
        fragment.appendChild(createElement('input',['something'],'age','Enter your age', true));
        fragment.appendChild(createElement('input',['something'],'normalPressure','Enter your normal pressure', true));
        fragment.appendChild(createElement('input',['something'],'bodyMassIndex','Enter your body mass index', true));
        fragment.appendChild(createElement('input',['something'],'pastIllnesses','Enter your past diseases of the cardiovascular system', true));
        fragment.appendChild(createElement('textarea', ['something'],'additionalComments','Enter comments'));
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
}