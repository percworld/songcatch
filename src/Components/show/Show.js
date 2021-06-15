import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSet } from '../../api'
import { formatDate } from '../../utilities';
import './Show.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

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
        updateShow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const match = show.find(play => song.id === play.Id);
    const venue = plays.find(play => play.Id === parseInt(showID));
    const setOne = show.filter(song => parseInt(song.SetNumber) === 1);
    const setTwo = show.filter(song => parseInt(song.SetNumber) === 2);
    const encore = show.filter(song => parseInt(song.SetNumber) === 9);
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
            {match && <div className='stats'><p>{match.Name}<span> was song #{match.Position} in set {match.SetNumber}.</span>
                {match.DateLastPlayed && <span>It was last played {match.GapSinceLastPlay} shows before on {match.DateLastPlayed}.
                    {/*
                    <span> song #{match.LastPosition} of set {match.LastSetNumber}</span> */}
                </span>}
                </p>
            </div>}
            {/* <img src={'/assets/Screen_Shot_2021-05-03_at_9.32.20_AM-removebg-preview  (2).png'} /> */}
            {typeof(song) === 'object' ? 
                <Link className='show-back' to={`/song/${song}`}>
                    <i><Back className="back"></Back></i>
                </Link> : 
                <Link className='show-back' to={`/song/6238`}>
                    <i><Back className="back"></Back></i>
                </Link>}
            {venue && <div className='head1'> 
                <p>{bandName}</p>
                <p className='head2'>{formatDate(venue.DateTime)}</p>
                <p className='head2'>{venue.Venue.Name}<span className='head3'> - {venue.Venue.Locale}</span></p>
            </div>}
                
               {!venue && <p className="alert" >This show hasn't happened yet, buy some tickets to find out!</p>}
            {setOne.length ?
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
                : <p className='error'>Loading...</p>}
        </div>
    )
}
export default Show;

Show.propTypes = {
    plays: propTypes.array,
    showID: propTypes.string,
    bandName: propTypes.string
}