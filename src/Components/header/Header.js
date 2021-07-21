import React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
// import { ReactComponent as Star  } from '../icons/star.svg'

const Header = () => {
    return (
        <header>
            <Link to='/' className='homeLink'>
                <h3 className='title' data-cy='setlift'>Setlist</h3>
                {/* <Star className='star'></Star> */}
            </Link>


        </header>)
}

export default Header;