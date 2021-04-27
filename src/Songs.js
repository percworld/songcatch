import React from 'react';
import { Link } from 'react-router-dom';
import Song from './song/Song';


const Songs = ({ songs, category }) => {
    const sortedSongs = songs.sort((a, b) => a.Name - b.Name)
    const filteredSongs = sortedSongs.filter(song => {
        switch (category) {
            case 'all':
                return true;
            case 'original': return !song.Cover;
            case 'cover': return song.Cover;
        }

        // (category === 'all') && 
        // return true;
        // category === 'original' && return song.Cover === false;
        // category === 'cover' && return song.Cover === true;
    })
    const songsToDisplay = filteredSongs.map(song => {
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