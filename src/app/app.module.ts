import { AuthguardService } from './services/authGuard/authguard.service';

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
import { CandidateTrendComponent } from './components/candidate-trend/candidate-trend.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { UserAddComponent } from './components/user-add/user-add.component';
import { LocationAddViewComponent } from './components/location-add-view/location-add-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    SearchAndEditComponent,
    CandidateAddComponent,
    CandidateEditDeleteDialogComponent,
    CandidateTrendComponent,
    PieChartComponent,
    UserAddComponent,
    LocationAddViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
