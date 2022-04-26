import { Component, Input, OnInit } from '@angular/core';
import { MainsidebarComponent } from '../mainsidebar/mainsidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() mainSideBar : MainsidebarComponent;
  

  constructor() {}

  ngOnInit(): void {
    
  }

  hamburguerBtn(){
  }

}
