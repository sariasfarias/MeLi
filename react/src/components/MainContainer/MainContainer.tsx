import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './MainContainer.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn/SignIn';
import { LogIn } from '../LogIn/LogIn';

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
                <Route path="/" element={null}/>
                <Route path="/sing-in" element={<SignIn/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    );
}