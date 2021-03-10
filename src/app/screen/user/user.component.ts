import { Router } from '@angular/router';
import { NavItem } from '../../model/nav-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  taskBarName: string = 'Candidate Management';
  navItems: NavItem[] = [
    {
      displayName: 'Search',
      iconName: 'search',
      route: 'searchAndEdit',
      data: {
        getCandidateEndpoint: 'candidate/getAllActive',
        tableHeader: ['candidateId', 'name', 'email', 'phoneNumber', 'location', 'institution'],
        dataType: 'candidate',
        userRole: 'USER'
      }
    },
    {
      displayName: 'Add',
      iconName: 'add',
      route: 'addCandidate',
      data: {
        addCandidateEndpoint: 'candidate/add',
        getLocationEndpoint: 'location/getAll',
        getInstitutionEndpoint: 'institution/getAll'
      }
    },
    {
      displayName: 'Trend',
      iconName: 'trending_up',
      route: 'candidateTrend',
      data: {
        getCandidateEndpoint: 'candidate/getAllActive',
        getLocationEndpoint: 'location/getAll',
        getInstitutionEndpoint: 'institution/getAll'
      }
    }
  ]
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}
