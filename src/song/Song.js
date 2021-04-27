import React from 'react';
import { getSong } from './../utilities';

const Song = ({ songID }) => {
    const songDetails = getSong(songID);
    console.log("SongID: ", songID)
    return (

        <p>{songID}</p>
    )

}

export default Song;