import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createSelector, select, Store } from '@ngrx/store';
import { pipe, Subscription } from 'rxjs';
import { slideToLeft } from 'src/app/shared/animation/router.animations';
import { Student } from 'src/app/shared/models/student.model';
import { ChangeForm } from 'src/app/store/actions/form.action';
import { formSelector } from 'src/app/store/selectors/form.selector';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-form-general',
  templateUrl: './form-general.component.html',
  styleUrls: ['./form-general.component.scss'],
  animations: [slideToLeft()],
})

export class FormGeneralComponent implements OnInit, OnDestroy {
  formGeneral: FormGroup;
  subscription: Subscription;
  constructor(
    private store: Store<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(formSelector, {}).subscribe((res: Student) => {
      this.createForm(res);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.updateForm(this.formGeneral.getRawValue());
  }

  createForm(data: Student): void {
    this.formGeneral = this.fb.group({
      name: data.name
    });
  }

  updateForm(data: Student): void {
    this.store.dispatch(
      new ChangeForm({
        data
      })
    );
  }

}
