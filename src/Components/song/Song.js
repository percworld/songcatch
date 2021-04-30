import React, { useState } from 'react';
import { getSong, getPlays } from '../../api';

const Song = ({ songID }) => {
    const [feature, setFeature] = useState();
    const details = async () => {
        try {
            const songDetails = await getSong(songID);
            console.log(songDetails);
            //setFeature(songDetails);
            const playDetails = await getPlays(songID);
            console.log(playDetails);
        } catch {
            throw new Error('Whyyyy')
        }
    }

    return (
        <article>
            <p>details</p>
            <p>{feature}</p>
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