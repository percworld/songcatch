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
            <input onChange={event => updateSearch(event.target.value)}
                type='text'
                value={searchText}
                placeholder='Search by Song Name'
                name='songName'>
            </input>
            <p>or scroll and click below</p>
            {/* <button onClick={event => searchSongByName(event, searchText)}>Submit</button> */}
        </form>
    )
}

export default Search;