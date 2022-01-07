import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators ,AbstractControl} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { DataUserService } from '../Mock-data/data-user.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup
  dataUsers:any
  check:any
  constructor(private fn: FormBuilder,private dataUser:DataUserService) { }

  ngOnInit(): void {
    this.form = this.fn.group({
      name: ['',[Validators.required]],
      Email: ['',[Validators.required,Validators.email]],
      gender: [],
      skills: this.fn.array([]),
      social: this.fn.group({
        facebook: '',
        twitter: ''
      }),
      tels: this.fn.array([
        this.addTel()
      ])
    })
    this.dataUser.getDatauser().subscribe(data=>this.dataUsers=data)
 

    
  }
  onSubmit(val: FormGroup) {
    console.log(val.value);

  }

  get tels(): FormArray {
    return this.form.get('tels') as FormArray;
  }

  addTel() {
    return this.fn.group({
      tel: [],
      address: []
    })
  }
  additemtel() {
    this.tels.push(this.addTel())
  }
  removeTel(index: number) {
    this.tels.removeAt(index);
  }
  handleChecked(e: any) {
    const valueCheck: FormArray = this.form.get('skills') as FormArray
    valueCheck.push(new FormControl(e.target.value))
  }
}
