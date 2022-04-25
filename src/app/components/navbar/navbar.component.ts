import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  hamburguerBtn(){
    let navbar = document.getElementById('navbar');
    if(navbar) navbar.style.marginLeft = '0';
  }

}
