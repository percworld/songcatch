import React from 'react';
//import { dateModify } from '../../utilities'
import { Link } from 'react-router-dom';

const Song = ({ song, plays, addFavorite }) => {
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
            <p>{song.Name}</p>
            <button onClick={() => { addFavorite(song) }}>Add to favorites</button>
            {song.Cover ? <p>Cover of {song.Artist}</p> : <p>Lotus Original</p>}
            <p>Plays:</p>
            {!plays.length ? <p>Loading...</p> : playsToDisplay}
        </article>
    )
}

export default Song;