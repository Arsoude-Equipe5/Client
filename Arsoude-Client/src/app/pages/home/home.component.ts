import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(private auth: AuthService){}
  // ngOnInit(): void {

  //   // this.auth.getHikes().subscribe({

  //   // next:(res)=>{

  //   //   console.log(res);
      

  //   // },
  //   // error:(err)=>{console.log(err);
  //   // }
  //   // })

  // }

 

}
