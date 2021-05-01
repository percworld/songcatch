import React, { useState } from 'react';
import { } from '../../api';
import { dateModify } from '../../utilities'
import { Link } from 'react-router-dom';

const Song = ({ song, plays }) => {
    const [feature, setFeature] = useState();
    plays.length && console.log(plays[0])

    //plays.Venue.Locale  .Venue.Name 
    // change date import utility
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
            {song.Cover ? <p>Cover of {song.Artist}</p> : <p>Lotus Original</p>}
            <p>Plays:</p>
            {!plays.length ? <p>Loading...</p> : playsToDisplay}
            {song && <p>{song.Name} ID: {song.Id}</p>}

        </article>
    )
    // try {
    //     const songDetails = await getSong(songID);
    //     console.log(songDetails);
    //     const playDetails = await getPlays(songID);
    //     console.log(playDetails);
    //     return (
    //         <article>
    //             {/* <p>{songDetails.name}</p> */}
    //             {/* <p>{playDetails}</p> */}
    //         </article>
    //     )
    // } catch (error) {
    //     console.log(error)
    // }

}

export default Song;