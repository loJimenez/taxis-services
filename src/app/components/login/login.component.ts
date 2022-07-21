import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.email, this.password)
    .then(answer => {
      console.log(answer);      
      this.router.navigate(['/dashboard'])
    })
    .catch(error => {
      console.log(error);
      
    });
  }

}
