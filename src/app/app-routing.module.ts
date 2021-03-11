import { InstitutionAddViewComponent } from './components/institution-add-view/institution-add-view.component';
import { LocationAddViewComponent } from './components/location-add-view/location-add-view.component';
import { RouteGuard } from './guard/route.guard';
import { UserAddComponent } from './components/user-add/user-add.component';
import { CandidateTrendComponent } from './components/candidate-trend/candidate-trend.component';
import { SearchAndEditComponent } from './components/search-and-edit/search-and-edit.component';
import { AdminComponent } from './screen/admin/admin.component';
import { UserComponent } from './screen/user/user.component';
import { LoginComponent } from './screen/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent, canActivate:[RouteGuard], children: [
    // {path: '', pathMatch: 'full', redirectTo: 'searchAndEdit'},
    {path: 'searchAndEdit', component: SearchAndEditComponent},
    {path: 'addCandidate', component: CandidateAddComponent},
    {path: 'candidateTrend', component: CandidateTrendComponent}
  ]},
  {path: 'admin', component: AdminComponent, canActivate:[RouteGuard], children: [
    // {path: '', pathMatch: 'full', redirectTo: 'searchAndEdit'},
    {path: 'addUser', component: UserAddComponent},
    {path: 'location', component: LocationAddViewComponent},
    {path: 'institution', component: InstitutionAddViewComponent},
    {path: 'searchAndEditUser', component: SearchAndEditComponent},
    {path: 'searchAndEditCandidate', component: SearchAndEditComponent},
    {path: 'addCandidate', component: CandidateAddComponent},
    {path: 'candidateTrend', component: CandidateTrendComponent}
  ]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
