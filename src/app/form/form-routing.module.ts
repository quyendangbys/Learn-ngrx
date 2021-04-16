import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormGeneralComponent } from './form-general/form-general.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
import { FormComponent } from './form.component';

const routes: Routes = [

  {
    path: '', component: FormComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', pathMatch: 'full', component: FormGeneralComponent },
      { path: 'detail', pathMatch: 'full', component: FormDetailComponent },
      { path: 'registration', pathMatch: 'full', component: FormRegistrationComponent },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
