import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  roles: string[] = ['ADMIN', 'USER'];

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    role: new FormControl(''),
  });

  constructor(private _service: ApiService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userForm.get('role')?.setValue(this.roles[1]);
  }

  infoSnackBar(infoText: string) {
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  addUser() {
    if (this.userForm.valid) {
      let userData: User = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        role: this.userForm.get('role')?.value,
      };

      this._service.postData(userData, 'user/add').subscribe({
        next: (response) => {
          this.userForm.reset();
          this.infoSnackBar(response.message);
        },
        error: (error) => {
          console.log(error);
          if (error.error.message) this.infoSnackBar(error.error.message);
          else this.infoSnackBar(error.error);
        },
      });
    } else {
      console.log('Form not valid!');
    }
  }
}
