import React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
// import { ReactComponent as Star  } from '../icons/star.svg'

const Header = ({ setBand }) => {
    return (
        <header>
            <Link to='/' 
            //   onClick={() => { setBand(12, 'Lotus') }}
              className='homeLink'>
                <h3 className='title' data-cy='setlift'>Setlift</h3>
                {/* <Star className='star'></Star> */}
            </Link>
        </header>)
}

export default Header;