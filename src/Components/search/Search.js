import React, { useState } from 'react';
import './Search.scss';

const Search = ({ searchSongName }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearch = (text) => {
        setSearchText(text);
        searchSongName(searchText);
    }

    // const searchSongByName = (event, searchText) => {
    //     event.preventDefault();
    //     searchSongName(searchText);
    //     setSearchText('');
    // }

    return (
        <form>
            <input onChange={event => updateSearch(event.target.value)} type='text' value={searchText} placeholder='Scroll or enter a Song Name' name='songName'></input>
            {/* <button onClick={event => searchSongByName(event, searchText)}>Submit</button> */}

        </form>
    )
}

export default Search;