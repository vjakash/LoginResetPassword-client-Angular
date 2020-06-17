import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpageGuard } from './resetpage.guard';


const routes: Routes = [{
  path:"",
  component:LoginComponent
},{
  path:"register",
  component:RegisterComponent
},{
  path:"forgot",
  component:ForgotComponent
},{
  path:"resetpassword/:token/:email",
  component:ResetpassComponent,
  // canActivate:[ResetpageGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
