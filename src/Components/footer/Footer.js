import './Footer.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Monster } from '../icons/github.svg'
const Footer = () => {
    return (
        <footer>
            <NavLink exact to='/' className='bands' activeClassName='activeLink'>Home</NavLink>
            <NavLink exact to='/bands' data-cy='bands' className='bands' activeClassName='activeLink'>Bands</NavLink>
            <NavLink exact to='/attended' data-cy='attended' className='bands myShows' activeClassName='activeLink'>My Shows</NavLink>
            <a href='https://github.com/percworld' target="_blank" rel="noopener noreferrer">
                <Monster className='monster'></Monster>
            </a>
        </footer>
    )
}

export default Footer;
