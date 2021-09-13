import propTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import { formatDate } from '../../utilities';
import { Link } from 'react-router-dom';
import { getSong, getSet } from '../../api';
import './Song.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { ReactComponent as Heart } from '../icons/heart-solid.svg';
import { ReactComponent as BrokenHeart } from '../icons/heart-broken-solid.svg';

const Song = ({ song, plays, addFavorite, removeFavorite, favorites, matchedSongID, setSong, bandName, shows }) => {
    const [attendedShows, setAttendedShows] = useState([]);

    const getSetlist = async (show) => {      
                const setlist = await getSet(show.id);
                const included = setlist.find(item => {
                    return item.Id === song.id
                })
                if (included) {
                    setAttendedShows(attendedShows => [...attendedShows, setlist]);
                }         
    }

    const addViewed = () => {
        shows.forEach(show => {
             getSetlist(show);     
        })
    }

    useEffect(() => {
        addViewed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const switchSong = async () => {
        try {
            if(typeof(parseInt(matchedSongID)) === 'number' && matchedSongID) {
                const fetchedSong = await getSong(parseInt(matchedSongID))
                setSong(fetchedSong)
            } else {
              setSong(song)
            }
        } catch {
            throw new Error(`Song #${matchedSongID} cannot be fetched at this time.`)
        }
    }
    if ((matchedSongID !== undefined) && (parseInt(matchedSongID) !== song.id)) {
        switchSong();
    }

    const playsToDisplay = plays.map((play, index) => {
        return (
            <div className='play' key={index}>
                <Link to={`/show/${play.Id}`} >
                    <p className='venue'>{play.Venue.Name}</p>
                </Link>
                <span className='locDate'>{play.Venue.Locale} / {formatDate(play.DateTime)}</span>
            </div>
        )
    })

    const faveIds = favorites.map(fave => fave.id);

    

    return (
        <article className="playList">
            {bandName === 'Lotus' && <img className="songImg" src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
            {bandName === 'lespecial' && <img className="songImg" src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
            <p className='songTitle'>{song.name}</p>
            {song.cover ? <p className='head'>Cover of {song.artist}</p> : <p className='head'>{bandName} Original</p>}
            {plays.length &&
                <div className='playCount'>Played {plays.length} Time{plays.length > 1 && <span>s</span>}
                    {song.debut !== '0001-01-01T00:00:00' &&
                    <p className='playCount'>Debuted on {formatDate(song.debut)}</p>}
                </div>}
            {attendedShows.length > 0 && 
                <div className='playCount'>
                You have seen this song {attendedShows.length} {attendedShows.length < 2 ? <span>time!</span> : <span>times!</span>}
                </div>}
            {faveIds.includes(song.id) ?
                <div className='favorite-button' onClick={() => { removeFavorite(song) }}>
                    <i><BrokenHeart className="heart"></BrokenHeart></i>
                    <p className='add'>Remove</p>
                </div> :
                <div className='favorite-button' onClick={() => { addFavorite(song) }}>
                    <p><Heart className="heart"></Heart></p>
                    <p className='add'>Add</p>
                </div>
            }
            <div className='back-button' onClick={() => window.history.back()}>
                <i><Back className="back"></Back></i>
            </div>
            {(!plays.length || song.id === matchedSongID) ? <p>Loading...</p> :
                <div className='plays'>
                    <div className='playsContainer'>{playsToDisplay}</div>
                </div>}
        </article>
    )
}

export default Song;

Song.propTypes = {
    song: propTypes.object,
    plays: propTypes.array,
    addFavorite: propTypes.func,
    removeFavorite: propTypes.func,
    favorites: propTypes.array,
    matchedSongID: propTypes.string,
    setSong: propTypes.func,
    bandName: propTypes.string
}
