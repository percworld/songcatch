import React from 'react';
import { Link } from 'react-router-dom';
import Song from '../song/Song';
import './Songs.scss';

const Songs = ({ songs, category, setSong }) => {
    const sortedSongs = songs.sort((a, b) => a.Name - b.Name);
    const filteredSongs = sortedSongs.filter(song => {
        switch (category) {
            case 'All':
                return true;
            case 'Original': return !song.Cover;
            case 'Cover': return song.Cover;
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
            {songsToDisplay}
        </section>

    )

}

export default Songs;