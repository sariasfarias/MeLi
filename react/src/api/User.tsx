import axios from "axios";
import { IForm } from "../types";
import { RegisterURL } from "../constants";

export const registerNewUser = async (user: IForm, setError: Function) : Promise<void> => {
    const userJson = JSON.stringify(user);
    console.log(userJson);
    try {
        const {data, status} = await axios.post(
            RegisterURL, 
            userJson,
            {
                headers: {
                    'Content-Type': 'application/json', 
                }, 
                withCredentials: false,
            },
        );

        if(status === 201){
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            window.location.href = '/'
        } else {
            setError(true) 
        }

    } catch (error) {
        setError(true)
    }

}