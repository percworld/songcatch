import React from 'react';
import { formatDate } from '../../utilities';
import { Link } from 'react-router-dom';
import { getSong } from '../../api';
import './Song.scss';
// import brokenHeart from '/assets/heart-broken-solid.svg';
// import heart from '/assets/heart-solid.svg';

const Song = ({ song, plays, addFavorite, removeFavorite, favorites, matchedSongID, setSong, bandName }) => {
    //console.log('incoming song: ', song)
    //console.log("matched SONG ID: ", matchedSongID)
    // console.log("prev SONG ID: ", song.id)
    const switchSong = async () => {
        try {
            const fetchedSong = await getSong(matchedSongID)
            //console.log('Song LINE 14 FETCH', fetchedSong)
            setSong(fetchedSong)
        } catch {
            throw new Error(`Song #${matchedSongID} cannot be fetched at this time.`)
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
                    <p className='venue'>{play.Venue.Name}</p>
                </Link>
                <span className='locDate'>{play.Venue.Locale} / {formatDate(play.DateTime)}</span>
            </div>
        )
    })
    return (
        <article className="playList">
            {bandName === 'Lotus' && <img src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
            <p className='title'>{song.name}</p>
            {song.cover ? <p className='head'>Cover of {song.artist}</p> : <p className='head'>{bandName} Original</p>}
            {plays.length && <p className='playCount'>Played {plays.length} Time{plays.length > 1 && <span>s</span>}</p>}
            {favorites.includes(song) ?
                <button className='favorites-button' onClick={() => { removeFavorite(song) }}>Remove from favorites</button> :
                <div className='favorites-button' onClick={() => { addFavorite(song) }}>
                    <span>
                        <i className="fas fa-heart"></i>
                        <i className="fas fa-heart-broken"></i>
                        Add to favorites
                    </span>
                </div>
            }

            {!plays.length ? <p>Loading...</p> :
                <div className='plays'>
                    {playsToDisplay}
                </div>}
        </article>
    )
}

export default Song;