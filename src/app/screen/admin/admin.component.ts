import { NavItem } from '../../model/nav-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  taskBarName: string = 'Admin Panel';
  navItems: NavItem[] = [
    {
      displayName: 'Search User',
      iconName: 'saved_search',
    },
    {
      displayName: 'Add User',
      iconName: 'add'
    },
    {
      displayName: 'Search Candidate',
      iconName: 'saved_search',
    },
    {
      displayName: 'Add Candidate',
      iconName: 'add'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
