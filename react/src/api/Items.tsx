import axios from "axios";
import { getAuthorizationHeader, getItemsURL } from "./constants";

export const getItems = async (queryParam: String, setData: Function) : Promise<void> => {
    try {
        const response = await axios.get(
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

        setData(response.statusText === "OK" ? response.data : []);

    } catch (error) {
        setData([]); 
    }
}