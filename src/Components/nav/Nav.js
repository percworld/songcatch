import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';

const Nav = ({ updateCategory, searchSongName }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearch = (text) => {
        setSearchText(text);
    }

    const searchSongByName = (event, searchText) => {
        event.preventDefault();
        searchSongName(searchText);
        setSearchText('');
    }

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
                <form>
                    <input onChange={event => updateSearch(event.target.value)} type='text' value={searchText} placeholder='Or Enter A Song Name' name='songName'></input>
                    <button onClick={event => searchSongByName(event, searchText)}>Submit</button>

                </form>

            </div>

        </section>)
}

export default Nav;