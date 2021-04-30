import React, { useState } from 'react';
import { getSong, getPlays } from '../../api';

const Song = ({ song, plays }) => {
    const [feature, setFeature] = useState();
    plays.length && console.log(plays[0].Id)
    //setSong(songID)

    return (
        <article>
            <p>Song Stats</p>
            <p>{song.Name}</p>
            {plays.length && <p>{plays[0].Id}</p>}
            {song && <p>{song.Id}</p>}
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