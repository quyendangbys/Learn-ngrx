import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
import { FormGeneralComponent } from './form-general/form-general.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { StoreModule } from '@ngrx/store';
import { formReducer } from '../store/reducers/form.reducer';



@NgModule({
  declarations: [
    FormComponent,
    FormRegistrationComponent,
    FormGeneralComponent,
    FormDetailComponent,
    // StoreModule.forFeature('form', formReducer),
  ],
  imports: [
    CommonModule, SharedModule, FormRoutingModule
  ]
})
export class FormModule { }
