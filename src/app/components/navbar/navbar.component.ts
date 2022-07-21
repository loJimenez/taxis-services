import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.services';
import { MainsidebarComponent } from '../mainsidebar/mainsidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private loginServide: LoginService, private router: Router) {}

  ngOnInit(): void {
    
  }

  logout(){
    this.loginServide.logout();
    this.router.navigate(['/login']);
  }

}
