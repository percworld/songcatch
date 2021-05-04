import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSet } from '../../api'
import { formatDate } from '../../utilities';
import './Show.scss';

const Show = ({ plays, song, showID, bandName }) => {
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
    }, [showID])
    const match = show.find(play => song.id === play.Id);
    const venue = plays.find(play => play.Id === parseInt(showID));
    const setOne = show.filter(song => parseInt(song.SetNumber) === 1);
    const setTwo = show.filter(song => parseInt(song.SetNumber) === 2);
    const encore = show.filter(song => parseInt(song.SetNumber) === 9);
    // console.log('match: ', match)
    // console.log('SONG: ', song);
    // console.log('PLAYS: ', plays);
    //console.log('SHOW: ', show);
    // console.log('SHOW 1st: ', show[0]);
    const songsToDisplayOne = setOne.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} >
                <p>{track.Name}</p>
            </Link>
        )
    });
    const songsToDisplayTwo = setTwo.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} >
                <p>{track.Name}</p>
            </Link>
        )
    });
    const encoreToDisplay = encore.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} className='trackLink'>
                <p>{track.Name}</p>
            </Link>
        )
    })

    return (
        <div className='setListContainer'>
            {/* {console.log('Show Match:', match, 'Show Venue: ', venue)} */}
            {match && <div className='stats'><p>{match.Name}<span> was song #{match.Position} in set {match.SetNumber}.</span></p>
                {match.DateLastPlayed && <p>Last played {match.GapSinceLastPlay} shows before on {match.DateLastPlayed}
                    {/* and was
                    <span> song #{match.LastPosition} of set {match.LastSetNumber}</span> */}
                </p>}
                {/* {match.GapSinceLastPlay && <span>{match.GapSinceLastPlay} shows before and was</span>}
                {match.LastPosition && <span>song #{match.LastPosition} of set {match.LastSetNumber}</span>} */}
            </div>}
            {/* <img src={'/assets/Screen_Shot_2021-05-03_at_9.32.20_AM-removebg-preview  (2).png'} /> */}

            {venue && <div className='head1'>
                <p>{bandName}</p>
                <p className='head2'>{formatDate(venue.DateTime)}</p>
                <p className='head2'>{venue.Venue.Name}<span className='head3'> - {venue.Venue.Locale}</span></p>

            </div>}
            <article className='setList'>
                <div className='set'>
                    <p>Set 1</p>
                    <p>-----------------------</p>
                    {show.length ? songsToDisplayOne : <p>Loading...</p>}
                </div>
                <div className='set'>
                    {songsToDisplayTwo.length &&
                        <div>
                            <p>Set 2</p>
                            <p>-------------------</p>
                            {songsToDisplayTwo}
                        </div>}
                </div>
                <div className='set'>
                    {encore.length &&
                        <div>
                            <p>Encore</p>
                            <p>-------------------</p>
                            {encoreToDisplay}
                        </div>}
                </div>
            </article>

        </div >
    )
}
export default Show;