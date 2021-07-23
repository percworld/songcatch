import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';

const Nav = ({ updateCategory, bandName }) => {

    return (
        <section className='page-container'>
            {bandName === 'Lotus' && <img className="navImg" src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
            {bandName === 'lespecial' && <img className="navImg" src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
            <p className='name'>{bandName}</p>

            <div className='nav-container' data-cy='nav-container'>
                <Link to="/songs" data-cy='originals' onClick={() => updateCategory('Original')} className='navLink'>
                    Originals
                </Link>
                <Link to="/songs" data-cy='covers' onClick={() => updateCategory('Cover')} className='navLink'>
                    Covers
                </Link>
                <Link to="/songs" data-cy='all' onClick={() => updateCategory('All')} className='navLink'>
                    All Songs
                </Link>
                <Link to="/songs/favorites" data-cy='favorites' onClick={() => updateCategory('All')} className='navLink'>
                    My Favorites
                </Link>
            </div>

        </section>)
}

export default Nav;

Nav.propTypes = {
    updateCategory: propTypes.func,
    bandName: propTypes.string
}