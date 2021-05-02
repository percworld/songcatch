import React from 'react';
import { Link } from 'react-router-dom';
import './Songs.scss';
import Search from '../search/Search';

const Songs = ({ songs, category, setSong, searchSongName }) => {
    const sortedSongs = songs.sort((a, b) => {
        let letterA = a.Name.split('')[0].toUpperCase();
        let letterB = b.Name.split('')[0].toUpperCase();
        console.log(letterA, a, letterB, b)
        return letterB - letterA;
    });
    const filteredSongs = sortedSongs.filter(song => {
        switch (category) {
            case 'All':
                return true;
            case 'Original': return !song.Cover;
            case 'Cover': return song.Cover;
            default: return true;
        }

        // (category === 'all') && 
        // return true;
        // category === 'original' && return song.Cover === false;
        // category === 'cover' && return song.Cover === true;
    })
    const songsToDisplay = filteredSongs.map(song => {
        return (
            <section className='songSingle' key={song.Id}>
                <Link to={`/song/${song.Id}`} className="songName" onClick={() => setSong(song)}>
                    <p>{song.Name}</p>
                </Link>
            </section>
        )
    })

    return (
        <section className='songList'>
            <p className='head'>Lotus {category === 'All' ? null : category} Songs - {filteredSongs.length} Total</p>
            <Search searchSongName={searchSongName}></Search>
            {songsToDisplay}
        </section>

    )

}

export default Songs;