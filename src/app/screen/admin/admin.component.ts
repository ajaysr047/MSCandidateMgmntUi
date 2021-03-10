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
      iconName: 'search',
      route: 'searchAndEditUser',
      data: {
        getUserEndpoint: 'user/getAll',
        tableHeader: ['userId', 'name', 'email', 'role'],
        dataType: 'user',
        userRole: 'ADMIN'
      }     
    },
    {
      displayName: 'Add User',
      iconName: 'add',
      route: 'addUser'
    },
    {
      displayName: 'Search Candidate',
      iconName: 'search',
      route: 'searchAndEditCandidate',
      data: {
        getCandidateEndpoint: 'candidate/getAll',
        tableHeader: ['candidateId', 'name', 'email', 'phoneNumber', 'location', 'institution', 'status'],
        dataType: 'candidate',
        userRole: 'ADMIN'
      }      
    },
    {
      displayName: 'Add Candidate',
      iconName: 'add',
      route: 'addCandidate',
      data: {
        addCandidateEndpoint: 'candidate/add',
        getLocationEndpoint: 'location/getAll',
        getInstitutionEndpoint: 'institution/getAll'
      }
    },
    {
      displayName: 'Candidate Trend',
      iconName: 'trending_up',
      route: 'candidateTrend',
      data: {
        getCandidateEndpoint: 'candidate/getAllActive',
        getLocationEndpoint: 'location/getAll',
        getInstitutionEndpoint: 'institution/getAll'
      }
    },
    {
      displayName: 'Location',
      iconName: 'location_on',
      route: 'location',
      data: {
        getLocationEndpoint: 'location/getAll'
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
