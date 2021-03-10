import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }

  isLoggedIn(): boolean{
    if(sessionStorage.getItem('isLoggedIn') === 'true')
      return true;
    return false;
  }
}
