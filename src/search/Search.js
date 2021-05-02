import React, { useState } from 'react';
import './Nav.scss';

const Nav = ({ searchSongName }) => {
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
        <form>
            <input onChange={event => updateSearch(event.target.value)} type='text' value={searchText} placeholder='Or Enter A Song Name' name='songName'></input>
            <button onClick={event => searchSongByName(event, searchText)}>Submit</button>

        </form>
    )