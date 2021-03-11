import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
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

  constructor(private _router: Router, private _authService: SocialAuthService) { }

  ngOnInit(): void {
  }

  logout(){
    // Clean up
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('isLoggedIn');

    localStorage.removeItem('getCandidateEndpoint');
    localStorage.removeItem('addCandidateEndpoint');
    localStorage.removeItem('tableHeader');
    localStorage.removeItem('getLocationURL');
    localStorage.removeItem('userRole');
    localStorage.removeItem('getUserEndpoint');
    localStorage.removeItem('dataType');
    localStorage.removeItem('getInstitutionURL');
    localStorage.removeItem('addInstitutionEndpoint');
    
    // Google signout
    this._authService.signOut();
    
    // Re route to login
    this._router.navigate(['login']);
  }
}
