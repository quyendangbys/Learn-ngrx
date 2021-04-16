import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { formReducer } from "./reducers/form.reducer";

export const AppReducer: ActionReducerMap<AppState> = {
    form: formReducer
};


