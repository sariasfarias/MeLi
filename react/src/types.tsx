export interface IHeader{
    isAuth: boolean;
}

export interface IForm {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IBasicForm {
    name: string;
    lastName: string;
    email: string;
    password: string;
    isRegisterUser: boolean;
    formFunction: Function;
}
