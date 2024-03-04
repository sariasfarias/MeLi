import { SearchBar } from '../SearchBar/SearchBar';
import './Header.scss';
import meLiLogo from '../../assets/images/MeLiLogo.png';
import { IHeader } from '../../types';


export function Header( {isAuth} : IHeader ){
    
    return (
        <div className='header'>
            <div className='header__box'>
                <div className='header_logo'>
                    <img src={meLiLogo} height={25} alt="MeLi logo" />
                </div>
                {isAuth ? <SearchBar/> : null}
            </div>
        </div>
    );
}