import React from 'react';

const Song = ({ songID }) => {
    console.log("SongID: ", songID)
    return (

        <p>{songID}</p>
    )

}

export default Song;