import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { slideToLeft } from '../shared/animation/router.animations';
import { Student } from '../shared/models/student.model';
import { formSelector } from '../store/selectors/form.selector';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  isAgreed: boolean;
  subscription: Subscription;
  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(formSelector, {}).subscribe((res: Student) => {
      this.isAgreed = res.isAgreed;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
