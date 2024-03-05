import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './MainContainer.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn/SignIn';
import { LogIn } from '../LogIn/LogIn';
import { Home } from '../Home/Home';
import { ItemCardList } from '../ItemCardList/ItemCardList';
import { CategoryProvider } from '../../context';
import { ItemDetail } from '../ItemDetail/ItemDetail';

export function MainContainer () {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
        }
        
    }, [isAuth]);

    return (
        <CategoryProvider>
        <div className='main-container' data-testid='main-container'> 
            <BrowserRouter>
                <Header isAuth={isAuth}/>
                <Routes>
                    <Route path="/" element={<Home isAuth={isAuth} />}/>
                    <Route path="/sing-in" element={<SignIn/>}/>
                    <Route path="/log-in" element={<LogIn/>}/>
                    <Route path="/items" element={isAuth ? <ItemCardList /> : <Home isAuth={isAuth} />}/>
                    <Route path="/items/:itemId" element={isAuth ? <ItemDetail/> : <Home isAuth={isAuth} />}/>
                </Routes>
            </BrowserRouter>
        </div>
        </CategoryProvider>
    );
}