import React from 'react';
import { Link } from 'react-router-dom';
import './Songs.scss';
import Search from '../search/Search';
import './Songs.scss';

const Songs = ({ songs, category, setSong, searchSongName, bandName }) => {
    const sortedSongs = songs.sort((a, b) => {
        if (a.Name < b.Name) {
            return -1;
        }
        if (a.Name > b.Name) {
            return 1;
        }
        return 0;
    });
    const filteredSongs = sortedSongs.filter(song => {
        switch (category) {
            case 'All':
                return true;
            case 'Original': return !song.Cover;
            case 'Cover': return song.Cover;
            default: return true;
        }
    })
    const songsToDisplay = filteredSongs.map((song, index) => {
        return (
            <section className='songSingle' key={index}>
                {/* <Link to={`/song/${song.Id}`} className="songName" onClick={() => setSong(song)}>
                    <p>{song.Name}</p>
                </Link> */}
                <Link to={`/song/${song.Id}`} onClick={() => setSong(song)}>
                    <p>{song.Name}</p>
                </Link>
            </section>
        )
    })

    return (
        <section className='songList'>
            <p className='head'>{bandName} {category === 'All' ? null : category} Songs - {filteredSongs.length} Total</p>
            {/* {filteredSongs.length > 20 && <Search searchSongName={searchSongName}></Search>} */}
            {/* {console.log(filteredSongs)} */}
            <Search searchSongName={searchSongName}></Search>
            {songsToDisplay}
        </section>

    )

}

export default Songs;