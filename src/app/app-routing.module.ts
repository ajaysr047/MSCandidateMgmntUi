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
  {path: 'user', component: UserComponent, children: [
    // {path: '', pathMatch: 'full', redirectTo: 'searchAndEdit'},
    {path: 'searchAndEdit', component: SearchAndEditComponent},
    {path: 'addCandidate', component: CandidateAddComponent}
  ]},
  {path: 'admin', component: AdminComponent, children: [
    // {path: '', pathMatch: 'full', redirectTo: 'searchAndEdit'},
    {path: 'searchAndEdit', component: SearchAndEditComponent},
    {path: 'addCandidate', component: CandidateAddComponent}
  ]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
