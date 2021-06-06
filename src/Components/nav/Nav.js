import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';

const Nav = ({ updateCategory, bandName }) => {

    return (
        <section className='page-container'>
            {bandName === 'Lotus' && <img src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
            {bandName === 'lespecial' && <img src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
            {bandName !== 'Lotu' && <p className='name'>{bandName}</p>}
            <div className='nav-container' data-cy='nav-container'>
                <Link to="/songs" data-cy='originals' onClick={() => updateCategory('Original')} >
                    <p>Originals</p>
                </Link>
                <Link to="/songs" data-cy='covers' onClick={() => updateCategory('Cover')} >
                    <p>Covers</p>
                </Link>
                <Link to="/songs" data-cy='all' onClick={() => updateCategory('All')} >
                    <p>All Songs</p>
                </Link>
                <Link to="/songs/favorites" data-cy='favorites' onClick={() => updateCategory('All')} >
                    <p>My Favorites</p>
                </Link>
            </div>

        </section>)
}

export default Nav;

Nav.propTypes = {
    updateCategory: propTypes.func,
    bandName: propTypes.string
}