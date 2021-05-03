import React from 'react';
import { formatDate } from '../../utilities';
import { Link } from 'react-router-dom';
import { getSong } from '../../api';
import './Song.scss';

const Song = ({ song, plays, addFavorite, removeFavorite, favorites, matchedSongID, setSong, bandName }) => {
    //console.log('incoming song: ', song)
    console.log("matched SONG ID: ", matchedSongID)
    // console.log("prev SONG ID: ", song.id)
    const switchSong = async () => {
        try {
            const fetchedSong = await getSong(matchedSongID)
            console.log('Song LINE 14 FETCH', fetchedSong)
            setSong(fetchedSong)
        } catch {
            console.log('SONG Problem')
        }
    }
    if (parseInt(matchedSongID) !== song.id) {
        switchSong();
    }

    const playsToDisplay = plays.map((play, index) => {
        return (
            <div className='play' key={index}>
                <Link to={`/show/${play.Id}`} >
                    {/* key={play.Id} */}
                    <p>{play.Venue.Name}</p>
                </Link>
                <span>{play.Venue.Locale} on {formatDate(play.DateTime)}</span>
            </div>
        )
    })
    return (
        <article className="playList">
            {bandName === 'Lotus' && <img src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
            <p className='title'>{song.name}</p>
            {favorites.includes(song) ?
                <button onClick={() => { removeFavorite(song) }}>Remove from favorites</button> :
                <button onClick={() => { addFavorite(song) }}>Add to favorites</button>
            }
            {song.cover ? <p className='head'>Cover of {song.artist}</p> : <p>{bandName} Original</p>}

            {!plays.length ? <p>Loading...</p> :
                <div>
                    <p className='playCount'>{plays.length} Play{plays.length > 1 && <span>s</span>}:</p>
                    {playsToDisplay}
                </div>}
        </article>
    )
}

export default Song;