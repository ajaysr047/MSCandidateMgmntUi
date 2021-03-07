import { NavItem } from '../../model/nav-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() taskBarName: string = '';
  @Input() navItems: NavItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
