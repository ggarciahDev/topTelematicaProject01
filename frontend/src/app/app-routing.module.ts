import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MedidasComponent } from './components/medidas/medidas.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: MedidasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
