import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to='/tours'>Tours</Link>
            <Link to='/shows'>Shows</Link>
            <Link to='/bands'>Other</Link>
            <a href='https://github.com/percworld' target="_blank" rel="noopener noreferrer">Projects</a>
        </footer>
    )
}

export default Footer;
