import propTypes from 'prop-types';
import React, { useState } from 'react';
import './Search.scss';

const Search = ({ searchSongName }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearch = (event, text) => {
        setSearchText(text);
        searchSongName(searchText);
    }

    const preventLoad = event => {
        event.preventDefault();
    }

    return (
        <form>
            <input className='purpleButton' onChange={event => updateSearch(event, event.target.value)}
                onSubmit={preventLoad}
                type='text'
                value={searchText}
                placeholder='SEARCH'
                name='songName'>
            </input>
        </form>
    )
}

export default Search;

Search.propTypes = {
    searchSongName: propTypes.func
}