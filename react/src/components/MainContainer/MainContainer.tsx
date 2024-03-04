import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './MainContainer.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn/SignIn';
import { LogIn } from '../LogIn/LogIn';
import { Home } from '../Home/Home';
import { ISearchBarResponse } from '../../types';

export function MainContainer () {
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState<ISearchBarResponse>();
    
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
        }
        
    }, [isAuth]);

    return (
        <div className='main-container' data-testid='main-container'> 
            <BrowserRouter>
                <Header isAuth={isAuth} setData={setData}/>
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />}/>
                <Route path="/sing-in" element={<SignIn/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
                <Route path="/items?search=" element={null}/>
                <Route path="/items/s" element={null}/>
            </Routes>
        </BrowserRouter>
        </div>
    );
}