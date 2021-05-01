import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to='/'>
                <h3>Sifter</h3>
            </Link>


        </header>)
}

export default Header;