import React from 'react';
import { Link } from 'react-router-dom';
import Song from './Song';


const Songs = ({ songs }) => {
    console.log(songs);
    const songsToDisplay = songs.map(song => {
        return (
            <Link to={`/${song.id}`} key={song.id} className="songName">
                <p>{song.Name}</p>
            </Link >
        )
    })

    return (
        <section className="songList">
            {songsToDisplay}
        </section>

    )

}

export default Songs;