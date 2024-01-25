import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 
  async ngOnInit(): Promise<void> {
    // throw new Error('Method not implemented.');

    let response = await lastValueFrom(this.http.get<any>('http://localhost:5020/api/HelloWorld/HelloWorld'));
console.log(response.text);
this.msgRecu = response.text;

  }

  constructor(public http:HttpClient){}

  title = 'Arsoude-Client';
  msgRecu :string= '';

}
