import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators ,AbstractControl} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { DataUserService } from '../Mock-data/data-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'protractor';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup
  dataUsers:any
  check:any
  data:any
  constructor(private fn: FormBuilder,private dataUser:DataUserService,private demo:HttpClient) { }

  ngOnInit(): void {
    this.form = this.fn.group({
      name: ['',[Validators.required]],
      Email: ['',[Validators.required,Validators.email]],
      gender: ["male"],
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

     this.data=val.value
    // this.dataUser.updatUser(data)
    this.demo.put<any>('https://61d7f81be6744d0017ba8879.mockapi.io/user/datausers?id=1',this.data).subscribe({
      next:data=>{
        console.log(data)
      },
      error : error =>{
        console.error(error)
        
      }
    })
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
