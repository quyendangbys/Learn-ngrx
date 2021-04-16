import { ChangeForm, FormType } from '../actions/form.action';
import { FormStudentState, initialFormStudentState } from '../states/form.state';
import { merge } from 'lodash';

export const initialState = {};

export function formReducer(
    state = initialFormStudentState,
    action: ChangeForm
): FormStudentState {
    switch (action.type) {
        case FormType.CHANGE_DATA: {
            return merge({}, state, action.payload);
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
