import { IHeader } from "../../types";
import { LogIn } from "../LogIn/LogIn";

export const Home = ({isAuth} : IHeader ) => {

    const logIn = (
        <>
            <h2>Usuario no encontrado</h2>
            <LogIn/>
        </>
    );

    return (<>{isAuth ? null : logIn}</>); 
}