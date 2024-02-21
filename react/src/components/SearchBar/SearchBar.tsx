import { useState } from 'react';
import './SearchBar.scss';

export function SearchBar(){
    const [searchText, setSearchText] = useState("");

    const handleOnChange = (e: any) => {
        setSearchText(e.target.value);
    };
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleOnClick();
        }
    };

    const handleOnClick = () => {
        //call api
        console.log("text", searchText)
    }

    return (
        <div className="search-bar">
            <input 
                className="search-bar_input"
                type="text"
                placeholder="Nunca dejes de buscar"
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
                onClick={() => setSearchText("")}
                value={searchText}
            />
            <button
                className="search-bar_button"
                onClick={() => handleOnClick()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height={18} width={18} viewBox="0 0 512 512"><path fill="666666" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            </button>   
        </div>
    );
}