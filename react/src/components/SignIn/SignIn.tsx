import { IForm } from "../../types";
import { BasicForm } from "../Form/Form";
import './SignIn.scss';

export const SignIn = () => {

    const onSubmit = (user : IForm) => {
        //console.log("xxxxxxxx", user)
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
        </div>
    );
    
}