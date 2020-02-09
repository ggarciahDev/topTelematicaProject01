import { Component, OnInit } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: string;
  userEmail: string;
  userPassword: string;

  constructor(private medidaService: MedidaService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    if(this.userName==null || this.userEmail==null || this.userPassword==null){
      console.log("nea, tenés que llenar todos los campos");
      console.log(this.userName,this.userEmail,this.userPassword);
    }else{
      this.medidaService.registerUser(this.userName, this.userEmail, this.userPassword)
      .subscribe(res => {
          this.router.navigateByUrl('/home');
      });
    }
  }
}
