import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  mail:string ="";
  name:string ="";
  message:string ="";
  sending:boolean =false;

  constructor(
    private http:HttpClient,
    private toast: ToastService
  ) {
    
  }

  resetForm(){
    this.mail="";
    this.name="";
    this.message="";
  }

  send(event:Event){
    event.preventDefault();
    this.sending=true;
    this.http.post('https://app-7f90d95d-9a3e-4d21-b659-8fd0a24a075d.cleverapps.io/api/contact',{
      email:this.mail,
      name:this.name,
      message:this.message
    }).subscribe({
      next:()=>{
        this.resetForm();
        this.toast.info("Gracias por contactarnos!");
      },
      error:()=>{
        this.toast.error("Ha ocurrido un error.");
      },
      complete:()=>{
        this.sending=false;
      }
    })
  }
}
