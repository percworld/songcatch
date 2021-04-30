import React from 'react';
import { getSong, getPlays } from '../../api';

const Song = ({ songID }) => {

    const songDetails = getSong(songID);
    console.log(songDetails);
    const playDetails = getPlays(songID);
    console.log(playDetails);
    return (
        <article>
            <p>{songDetails.name}</p>
            {/* <p>{playDetails}</p> */}
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