import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screen/login/login.component';
import { AdminComponent } from './screen/admin/admin.component';
import { UserComponent } from './screen/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchAndEditComponent } from './components/search-and-edit/search-and-edit.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { CandidateEditDeleteDialogComponent } from './components/candidate-edit-delete-dialog/candidate-edit-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    SearchAndEditComponent,
    CandidateAddComponent,
    CandidateEditDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
