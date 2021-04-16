import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { slideToLeft } from 'src/app/shared/animation/router.animations';
import { Student } from 'src/app/shared/models/student.model';
import { ChangeForm } from 'src/app/store/actions/form.action';
import { formSelector } from 'src/app/store/selectors/form.selector';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  animations: [slideToLeft()]
})
export class FormDetailComponent implements OnInit, OnDestroy {
  formDetail: FormGroup;
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
    this.updateForm(this.formDetail.getRawValue());
  }

  createForm(data: Student): void {
    this.formDetail = this.fb.group({
      dateOfBirth: data.dateOfBirth,
      identityCard: data.identityCard,
      address: data.address
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
