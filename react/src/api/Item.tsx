import axios from "axios";
import { getAuthorizationHeader, getItemsURL } from "./constants";

export const getItem = async (itemId: String, setData: Function) : Promise<void> => {
    const url = getItemsURL + "/" + itemId
    try {
        const response = await axios.get(
            url, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getAuthorizationHeader()  
                }, 
                withCredentials: false,
            },
        );

        await setData(response.statusText === "OK" ? response.data.item : []);

    } catch (error) {
        setData([]); 
    }
}