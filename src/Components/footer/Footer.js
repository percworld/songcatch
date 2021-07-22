import './Footer.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Monster } from '../icons/github.svg'
const Footer = () => {
    return (
        <footer>
            <NavLink exact to='/nav' data-cy='songs' activeClassName='activeLink'>Songs</NavLink>
            <NavLink exact to='/tours' data-cy='tours' activeClassName='activeLink'>Tours</NavLink>
            <NavLink exact to='/shows' data-cy='shows' activeClassName='activeLink'>Shows</NavLink>
            <a href='https://github.com/percworld' target="_blank" rel="noopener noreferrer">
                <Monster className='monster'></Monster>
            </a>
        </footer>
    )
}

export default Footer;
