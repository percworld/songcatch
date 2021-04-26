import React from 'react';
import { Link } from 'react-router-dom';
import Song from './Song';


const Songs = ({ songs }) => {
    const sortedSongs = songs.sort((a, b) => a.Name - b.Name)
    const songsToDisplay = sortedSongs.map(song => {
        return (
            <Link to={`/${song.Id}`} key={song.Id} className="songName">
                <p>{song.Name}</p>
            </Link>
        )
    })

    return (
        <section className="songList">
            {songsToDisplay}
        </section>

    )

}

export default Songs;