import { SearchBar } from '../SearchBar/SearchBar';
import './Header.scss';

export function Header(){
    return (
        <div className='header'>
            <SearchBar/>
        </div>
    );
}