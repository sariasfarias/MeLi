import { SearchBar } from '../SearchBar/SearchBar';
import './Header.scss';
import meLiLogo from '../../assets/images/MeLiLogo.png';
import { IHeader, ISearchBar } from '../../types';


export function Header( {isAuth, setData} : IHeader & ISearchBar){
    
    return (
        <div className='header'>
            <div className='header_logo'>
                <img src={meLiLogo} height={25} alt="MeLi logo" />
            </div>
            {isAuth ? <SearchBar setData={setData}/> : null}
        </div>
    );
}