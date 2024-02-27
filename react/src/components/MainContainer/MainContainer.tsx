import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './MainContainer.scss';

export function MainContainer () {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
        }
        
    }, [isAuth]);

    return (
        <div className='main-container'> 
            <Header isAuth={isAuth}/>
        </div>
    );
}