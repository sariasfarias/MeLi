import { useState } from "react";
import { registerNewUser } from "../../api/User";
import { IForm } from "../../types";
import { BasicForm } from "../Form/Form";
import './SignIn.scss';

export const SignIn = () => {
    const [error, setError] = useState(false);
    const onSubmit = (user : IForm) => {
        registerNewUser(user, setError);
    }

    return (
        <div className="sign-in">
            <h2>Registro</h2>
            <BasicForm 
                isRegisterUser={false} 
                formFunction={onSubmit} 
                name={""} 
                lastName={""} 
                email={""} 
                password={""}
            />
            <a href={"/log-in"}>Tienes una cuenta? Ingresa</a>
            {error ? <h1>Oops! Intenta otra vez </h1> : null}
        </div>
    );
    
}