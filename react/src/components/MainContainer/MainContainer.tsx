import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './MainContainer.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn/SignIn';
import { LogIn } from '../LogIn/LogIn';
import { Home } from '../Home/Home';
import { IItemCard, ISearchBarResponse } from '../../types';
import { ItemCardList } from '../ItemCardList/ItemCardList';

export function MainContainer () {
    const [isAuth, setIsAuth] = useState(false); 
    
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
        }
        
    }, [isAuth]);

    return (
        <div className='main-container' data-testid='main-container'> 
            <BrowserRouter>
                <Header isAuth={isAuth}/>
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />}/>
                <Route path="/sing-in" element={<SignIn/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
                <Route path="/items" element={<ItemCardList />}/>
                <Route path="/items/s" element={null}/>
            </Routes>
        </BrowserRouter>
        </div>
    );
}