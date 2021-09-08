import propTypes from 'prop-types';
import React, { useState } from 'react';
import './Search.scss';

const Search = ({ searchSongName }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearch = (text) => {
        setSearchText(text);
        searchSongName(searchText);
    }

    const preventLoad = event => {
        event.preventDefault();
    }

    return (
        <form>
            <input className='searchbar' onChange={event => updateSearch(event.target.value)}
                onSubmit={(event) => preventLoad(event)}
                type='text'
                value={searchText}
                placeholder='QUIK SEARCH'
                name='songName'>
            </input>
        </form>
    )
}

export default Search;

Search.propTypes = {
    searchSongName: propTypes.func
}