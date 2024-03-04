export interface IHeader{
    isAuth: boolean;
}

export interface ISearchBar {
    setData: Function;
}

export interface IForm {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILogIn {
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


export interface IPrice {
    currency: String;
    amount: Number;
    decimals: Number;
}
export interface IItem {
    id: String;
    title: string;
    price: IPrice;
    picture: string;
    condition: String;
    free_shipping: boolean;
}

export interface ISearchBarResponse {
    author: {
        name: String;
        lastName: String;
    };
    categories : String[];
    items: IItem[];
}

export interface IItemCard {
    title: string;
    price: IPrice;
    picture: string;
    condition: String;
    freeShipping: boolean;
}

export interface IItemCardList{
    itemCardList: IItemCard[];
}