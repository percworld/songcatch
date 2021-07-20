import propTypes from 'prop-types';
import React, { useState } from 'react';
import './Search.scss';

const Search = ({ searchSongName }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearch = (text) => {
        setSearchText(text);
        searchSongName(searchText);
    }

    return (
        <form>
            <input className='purpleButton' onChange={event => updateSearch(event.target.value)}
                type='text'
                value={searchText}
                placeholder='Click Me to Filter by Title'
                name='songName'>
            </input>
            {/* <button onClick={event => searchSongByName(event, searchText)}>Submit</button> */}
        </form>
    )
}

export default Search;

Search.propTypes = {
    searchSongName: propTypes.func
}