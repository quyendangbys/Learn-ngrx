import { FormStudentState, initialFormStudentState } from './states/form.state';

export interface AppState {
    form: FormStudentState;
}

export const initialAppState: AppState = {
    form: initialFormStudentState
};

export function getInitialAppState(): any {
    return initialAppState;
}
