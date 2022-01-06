import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!:FormGroup
  constructor( private fn:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.fn.group({
      name:[''],
      Email:[],
      tel:[],
      social: this.fn.group({
        facebook:'',
        twitter:''
      }),
      tels: this.fn.array([
        this.fn.control('')
      ])
    })
  }
  onSubmit(val:FormGroup){
    console.log(val.value);
    
  }
  get tels(): FormArray {
    return this.form.get('tels') as FormArray;
  }
  
  addTel() {
    this.tels.push(this.fn.control(''));
  }
  
  removeTel(index: number) {
    this.tels.removeAt(index);
  }

}
