import React from 'react';
import { Link } from 'react-router-dom'

const Nav = ({ updateCategory }) => {
    return (
        <header>
            <Link to="/songs" onClick={() => updateCategory('Original')} >
                <p>Originals</p>
            </Link>
            <Link to="/songs" onClick={() => updateCategory('Cover')} >
                <p>Covers</p>
            </Link>
            <Link to="/songs" >
                <p>All Songs</p>
            </Link>

        </header>)
}

export default Nav;