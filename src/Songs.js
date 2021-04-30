import React from 'react';
import { Link } from 'react-router-dom';
import Song from './song/Song';


const Songs = ({ songs, category }) => {
    const sortedSongs = songs.sort((a, b) => a.Name - b.Name)
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
                <Link to={`/${song.Id}`} className="songName">
                    <p>{song.Name}</p>
                </Link>
            </section >
        )
    })

    return (
        <section className="songList">
            <p>{category} Songs: {filteredSongs.length} Total</p>
            {songsToDisplay}
        </section>

    )

}

export default Songs;