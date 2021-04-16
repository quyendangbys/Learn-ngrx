import { createSelector } from "@ngrx/store";
import { FormStudentState } from "../states/form.state";

export const formSelector = createSelector(
    (state, props) => state.form,
    (formState: FormStudentState) => formState.data
);
