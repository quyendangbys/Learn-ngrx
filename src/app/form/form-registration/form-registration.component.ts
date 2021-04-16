import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { slideToLeft } from 'src/app/shared/animation/router.animations';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { Student } from 'src/app/shared/models/student.model';
import { ChangeForm } from 'src/app/store/actions/form.action';
import { formSelector } from 'src/app/store/selectors/form.selector';
import { merge } from 'lodash';
@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss'],
  animations: [slideToLeft()]
})
export class FormRegistrationComponent implements OnInit, OnDestroy {
  formRegister: FormGroup;
  classData: Dictionary[] = [
    {
      id: '1',
      name: 'Angular'
    },
    {
      id: '2',
      name: 'ReactJS'
    },
    {
      id: '3',
      name: 'NodeJS'
    },
  ];
  subscription: Subscription;
  constructor(
    private store: Store<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm(new Student());
    this.subscription = this.store.select(formSelector, {}).subscribe((res: Student) => {
      this.formRegister.patchValue(merge({}, this.formRegister.getRawValue(), res));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.updateForm(this.formRegister.getRawValue());
  }

  createForm(data: Student): void {
    this.formRegister = this.fb.group({
      class: data.class,
      isAgreed: data.isAgreed
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
