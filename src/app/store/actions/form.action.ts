import { Action } from '@ngrx/store';
export const FormType = {
    CHANGE_DATA: '[FORM] change data',
};

export class ChangeForm implements Action {
    readonly type = FormType.CHANGE_DATA;
    constructor(public payload?: any) { }
}
