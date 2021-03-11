import { ApiService } from 'src/app/services/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

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
  private googleSignInURL = "user/googleSignIn";

  constructor(private _service: ApiService, private _router: Router, private _snackBar: MatSnackBar, private _authService: SocialAuthService) { }

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

  infoSnackBar(message: string){
    this._snackBar.open(message, 'close', {
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
    
          sessionStorage.setItem('userData', JSON.stringify(response));
          sessionStorage.setItem('isLoggedIn', 'true');
          if(response.role == 'USER'){
              this._router.navigate(['/user']);
          }else{
            this._router.navigate(['/admin']);
          }
        },
        error: error => {
          this.infoSnackBar('Unauthorized credentials! Kindly contact admin');
          console.log(error);
        }
      });

    }else{
      this.infoSnackBar('Credentials cannot be empty!!');
      console.log('Input not valid!!');
    }
  }

  googleSignIn(): void{
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this._authService.authState.subscribe((user) => {
      if(user != null){
        console.log('Google signin initiated!');

        this._service.postData({
          email: user.email
        }, this.googleSignInURL).subscribe({
          next: response => {
            console.log(response);
      
            sessionStorage.setItem('userData', JSON.stringify(response));
            sessionStorage.setItem('isLoggedIn', 'true');
            if(response.role == 'USER'){
                this._router.navigate(['/user']);
            }else{
              this._router.navigate(['/admin']);
            }
          },
          error: error => {
            this.infoSnackBar('Unauthorized credentials! Kindly contact admin');
            console.log(error);
          }
        });
  
      }else{
        this.infoSnackBar('Google login erro, Try local login or contact admin!');
        console.log('Google User error!');
      }
    });
  }
  

}
