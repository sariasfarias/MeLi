import axios from "axios";
import { getAuthorizationHeader, getItemsURL } from "./constants";

export const getItems = async (queryParam: String, setData: Function) : Promise<void> => {
    try {
        const {data} = await axios.get(
            getItemsURL, 
            {
                params: { q: queryParam },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getAuthorizationHeader()  
                }, 
                withCredentials: false,
            },
        );

        const json = await data.json();
        setData(data.ok ? json : []);

        console.log("--", setData)

    } catch (error) {
        setData([]); 
    }
}