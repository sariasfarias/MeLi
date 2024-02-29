import { useState } from "react";
import { LogInUser } from "../../api/User";
import { IForm } from "../../types";
import { BasicForm } from "../Form/Form";
import './LogIn.scss';

export const LogIn = () => {
    const [error, setError] = useState(false);
    const onSubmit = (user : IForm) => {
        LogInUser(user, setError);
    }

    return (
        <div className="log-in">
            <h2>Registro</h2>
            <BasicForm 
                formFunction={onSubmit} 
                name={""} 
                lastName={""} 
                email={""} 
                password={""}
            />
            <a href={"/sign-in"}>No tienes una cuenta? Registrate</a>
            {error ? <h1>Oops! Intenta otra vez </h1> : null}
        </div>
    );
    
}