import axios from "axios";
import { IForm, ILogIn } from "../types";
import { LogInURL, RegisterURL } from "../constants";


const setCredentials = (access : string, refresh: string) => {
    localStorage.clear();
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    window.location.href = '/'
};

export const registerNewUser = async (user: IForm, setError: Function) : Promise<void> => {
    const userJson = JSON.stringify(user);
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
            setCredentials(data.access, data.refresh);
        } else {
            setError(true) 
        }

    } catch (error) {
        setError(true)
    }
}

export const LogInUser = async (user: ILogIn, setError: Function) : Promise<void> => {
    const userJson = JSON.stringify(user);
    try {
        const {data, status} = await axios.post(
            LogInURL, 
            userJson,
            {
                headers: {
                    'Content-Type': 'application/json', 
                }, 
                withCredentials: false,
            },
        );

        if(status === 200){
            setCredentials(data.access, data.refresh);
        } else {
            setError(true) 
        }

    } catch (error) {
        setError(true)
    }
}