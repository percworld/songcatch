import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';

const Nav = ({ updateCategory }) => {

    return (
        <section className='page-container'>
            <img src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />
            <div className='nav-container'>
                <Link to="/songs" onClick={() => updateCategory('Original')} >
                    <p>Originals</p>
                </Link>
                <Link to="/songs" onClick={() => updateCategory('Cover')} >
                    <p>Covers</p>
                </Link>
                <Link to="/songs" onClick={() => updateCategory('All')} >
                    <p>All Songs</p>
                </Link>
                <Link to="/songs/favorites" onClick={() => updateCategory('All')} >
                    <p>My Favorites</p>
                </Link>
            </div>

        </section>)
}

export default Nav;