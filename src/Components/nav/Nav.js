import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

const Nav = ({ updateCategory, bandName }) => {

    
    return (
        <section className='page-container'>
            {bandName === 'Lotus' && 
                <a href='https://sites.google.com/site/thetravellog/original-songs?authuser=0' target="_blank" rel="noopener noreferrer" className='navImg'>
                    <img className="dashImg" src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />
                </a>
            }
            {bandName === 'lespecial' && <img className="navImg" src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
            <p className='name'>{bandName}</p>
            <div className='back-btn nav-btn' onClick={() => window.history.back()}>
                <i><Back></Back></i>
            </div>
            <div className='nav-container' data-cy='nav-container'>
                <Link to="/songs/favorites" data-cy='favorites' onClick={() => updateCategory('All')} className='navLink'>
                    My Favorites
                </Link>
                <Link to='top-songs'>
                    Top Played
                </Link>
                <Link to="/songs" data-cy='all' onClick={() => updateCategory('All')} className='navLink'>
                    All Songs
                </Link>
                <Link to="/songs" data-cy='originals' onClick={() => updateCategory('Original')} className='navLink'>
                    Originals
                </Link>
                <Link to="/songs" data-cy='covers' onClick={() => updateCategory('Cover')} className='navLink'>
                    Covers
                </Link>
            </div>

        </section>)
}

export default Nav;

Nav.propTypes = {
    updateCategory: propTypes.func,
    bandName: propTypes.string
}