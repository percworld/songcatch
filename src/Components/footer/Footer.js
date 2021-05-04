import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to='/tours'>Tours</Link>
            <Link to='/shows'>Shows</Link>
            <Link to='/bands'>Other</Link>
            {/* <Link to='/projects'>Projects</Link> */}
            <a href='https://github.com/percworld'>Projects</a>
            {/* // target_blank to open in new window */}

            {/* <button onClick={() => { }}></button> */}
        </footer>
    )
}

export default Footer;
