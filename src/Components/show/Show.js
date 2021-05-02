import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSet } from '../../api'
import { formatDate } from '../../utilities';
const Show = ({ plays, song, showID }) => {
    const [show, setShow] = useState([])

    useEffect(() => {
        const updateShow = async () => {
            try {
                const sets = await getSet(showID);
                setShow(sets)
            } catch {
                throw new Error(`No Set Available for Show #${showID}`)
            }
        }
        updateShow()
    }, [])
    const match = show.find(play => song.Id === play.Id);
    const venue = plays.find(play => play.Id === parseInt(showID));
    // console.log('match: ', match)
    // console.log('SONG: ', song);
    // console.log('PLAYS: ', plays);
    // console.log('SHOW: ', show);
    // console.log('SHOW 1st: ', show[0]);
    const songsToDisplay = show.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} >
                <p>{track.Name}</p>
            </Link>
        )
    })

    return (
        <div className='songList'>

            {match && <div><p>{match.Name}</p><p> was song #{match.Position} in set {match.SetNumber}.</p>
                {match.DateLastPlayed && <p>It was last played on {match.DateLastPlayed},</p>}
                {match.GapSinceLastPlay && <p>{match.GapSinceLastPlay} shows ago and was</p>}
                {match.LastPosition && <p>song #{match.LastPosition} in set {match.LastSetNumber}</p>}
            </div>}
            {venue && <div>
                <p>{venue.Venue.Name} - {venue.Locale}</p>
                <p>Setlist - Lotus - {venue.DateTime}</p></div>}
            {show.length ? songsToDisplay : <p>Loading...</p>}

        </div>
    )
}
export default Show;