import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:object = {};
  

  constructor(private _service:ApiService, private _router:Router) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  signIn(){
    if(this.emailFormControl.valid && this.passwordFormControl.valid){
      this.credentials = {
        email : this.emailFormControl.value,
        password : this.passwordFormControl.value
      }
      console.log('Log in initiated!');

      this._service.signIn(this.credentials).subscribe({
        next: response => {
          console.log(response);
          //Todo store user id
          if(response.role == 'USER'){
              this._router.navigate(['/user']);
          }else{
            this._router.navigate(['/admin']);
          }
        },
        error: error => {
          console.log(error);
        }
      });

    }else{
      console.log('Input not valid!!');
    }
  }

}
