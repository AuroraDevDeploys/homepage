import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
    private http:HttpClient
  ) { }

  send(event:Event){
    event.preventDefault();
    this.sending=true;
    this.http.post('http://localhost:3000/contact',{
      email:this.mail,
      name:this.name,
      message:this.message
    }).subscribe({
      next:res=>{
      },
      error:()=>{

      },
      complete:()=>{
        this.sending=false;
      }
    })
  }
}
