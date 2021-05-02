import React, { useEffect } from 'react';
//import { dateModify } from '../../utilities'
import { Link } from 'react-router-dom';
import { getSong } from '../../api';
import './Song.scss';

const Song = ({ song, plays, addFavorite, matchedSongID, setSong }) => {
    console.log('incoming song: ', song)
    console.log("matched SONG ID: ", matchedSongID)
    console.log("prev SONG ID: ", song.id)

    // useEffect(async () => {
    //     try {
    //         const fetchedSong = getSong(songID)
    //         setSong(fetchedSong)
    //     } catch {
    //         console.log('SONG')
    //     }
    // }, []);
    const switchSong = async () => {
        try {
            const fetchedSong = await getSong(matchedSongID)
            console.log('SONG LINE 22 FETCH', fetchedSong)
            setSong(fetchedSong)
        } catch {
            console.log('SONG')
        }
    }
    if (parseInt(matchedSongID) !== song.id) {
        switchSong();
    }

    const playsToDisplay = plays.map((play, index) => {
        return (
            <div key={play.Id}>
                <Link to={`/show/${play.Id}`} key={play.Id}>
                    <p>{play.Venue.Name}</p>
                </Link>
                <p>{play.Venue.Locale}</p>
            </div>
        )
    })
    return (
        <article className="playList">
            <img src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />
            <p className='title'>{song.name}</p>
            <button onClick={() => { addFavorite(song) }}>Add to favorites</button>
            {song.cover ? <p>Cover of {song.artist}</p> : <p>Lotus Original</p>}

            {!plays.length ? <p>Loading...</p> :
                <div>
                    <p>{plays.length} Play{plays.length > 1 && <span>s</span>}:</p>
                    {playsToDisplay}
                </div>}
        </article>
    )
}

export default Song;