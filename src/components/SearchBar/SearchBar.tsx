import { useState } from "react";

export function SearchBar(){
    return (
        <div className="search-bar">
            <input 
                type="text"
                placeholder="Nunca dejes de buscar"
            />
            <button
            >
                buscar :D 
            </button>   
        </div>
    );
}