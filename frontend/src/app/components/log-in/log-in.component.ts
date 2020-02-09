import { Component, OnInit } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { NgForm } from '@angular/forms';
import { Jwt } from '../../models/jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(private medidaService: MedidaService, private router: Router) { }

  ngOnInit() {
  
  }

  login(){
    var jwt: Jwt; //Json Web Token

    this.medidaService.loginUser(this.userEmail, this.userPassword)
    .subscribe(res => {
      jwt = res as Jwt;

      if(jwt.auth == true){
        console.log(jwt.auth,jwt.token);
        this.router.navigateByUrl('/home');
      }else{
        console.log("Contraseña incorrecta");
      }
    });
  }
}
