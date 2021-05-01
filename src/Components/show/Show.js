import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlays } from '../../api'

const Show = ({ plays, song, showID, show, updateShow }) => {
    //const [set, setSet] = useState({});
    //const songShowMatch = show.filter(play => song.Id === play.Id);
    console.log(plays[0].Id)
    console.log('SONG: ', song);
    console.log('PLAYS: ', plays);
    //console.log('Match: ', showID);
    showID && updateShow(showID)
    console.log('SHOW: ', show);

    const songsToDisplay = () => {
        const songs = show.map((track) => {
            return (
                <div>
                    <p>{track.Name}</p>


                    <p></p>
                </div>
            )
        })
        if (show) { return songs } else { return (<p>Loading...</p>) }
    }
    return (
        <>
            {/* <p>{song.Name} was song
            #{song.SongStats.Position} in set {song.SongStats.SetNumber}
                {console.log(song)}
            </p> */}
            <p>Setlist</p>

            {Object.values(show) ? songsToDisplay() : <p>Loading...</p>}
            {/* {if (Object.values(show)) {songsToDisplay()}} */}
        </>
    )
}
export default Show;