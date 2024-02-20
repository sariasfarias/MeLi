import { SearchBar } from '../SearchBar/SearchBar';
import './Header.scss';
import meLiLogo from '../../assets/images/MeLiLogo.png';

export function Header(){
    return (
        <div className='header'>
            <div className='header_logo'>
                <img src={meLiLogo} height={25} alt="MeLi logo" />
            </div>
            <SearchBar/>
        </div>
    );
}