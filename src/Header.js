import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to="/songs" >
                <p>Originals</p>
            </Link>
            <Link to="/songs" >
                <p>Covers</p>
            </Link>
            <Link to="/songs" >
                <p>All Songs</p>
            </Link>

        </header>)
}

export default Header;