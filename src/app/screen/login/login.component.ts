import { ApiService } from 'src/app/services/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';

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
  private signInUrl = "user/signIn";

  constructor(private _service: ApiService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  matcher = new MyErrorStateMatcher();

  failedSignInSnackBar(){
    this._snackBar.open('Unauthorized credentials! Kindly contact admin', 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  signIn(){
    if(this.emailFormControl.valid && this.passwordFormControl.valid){
      this.credentials = {
        email : this.emailFormControl.value,
        password : this.passwordFormControl.value
      }
      console.log('Log in initiated!');

      this._service.postData(this.credentials, this.signInUrl).subscribe({
        next: response => {
          console.log(response);
          //Todo store user id
          sessionStorage.setItem('userData', JSON.stringify(response));
          sessionStorage.setItem('isLoggedIn', 'true');
          if(response.role == 'USER'){
              this._router.navigate(['/user']);
          }else{
            this._router.navigate(['/admin']);
          }
        },
        error: error => {
          this.failedSignInSnackBar();
          console.log(error);
        }
      });

    }else{
      console.log('Input not valid!!');
    }
  }

}
