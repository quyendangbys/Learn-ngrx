import { Student } from "src/app/shared/models/student.model";

export interface FormStudentState {
    data: Student;
}

export const initialFormStudentState: FormStudentState = {
    data: {
        name: '',
        dateOfBirth: null,
        identityCard: '',
        address: '',
        class: null,
        isAgreed: false,
    }
};
