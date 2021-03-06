import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSet, getShow } from '../../api'
import { formatDate } from '../../utilities';
import './Show.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { ReactComponent as Attended } from '../icons/attend.svg';

const Show = ({ plays, song, showID, bandName }) => {
    const [show, setShow] = useState([]);
    const [showInfo, setShowInfo] = useState([]);

    useEffect(() => {
        const updateShow = async () => {
            try {
                const sets = await getSet(showID);
                setShow(sets); 
            } catch {
                throw new Error(`No Set Available for Show #${showID}`);
            }
        }
        updateShow();

        const updateShowInfo = async () => {
            try {
                const info = await getShow(showID);
                setShowInfo(info)
            } catch {
                console.log(`No Show Info Available for Show #${showID}`)
            }
        }
        updateShowInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showID])

    const match = show.find(play => song.id === play.Id);
    const setOne = show.filter(song => parseInt(song.SetNumber) === 1);
    const setTwo = show.filter(song => parseInt(song.SetNumber) === 2);
    const encore = show.filter(song => parseInt(song.SetNumber) === 9);
    const songsToDisplayOne = setOne.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} className='trackLink'>
                <p>{track.Name}</p>
            </Link>
        )
    });
    const songsToDisplayTwo = setTwo.map((track, index) => {
        return (
            <Link to={`/song/${track.Id}`} key={index} className='trackLink'>
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
            {match ? <div className='stats'><p>{match.Name}<span> was song #{match.Position} in set {match.SetNumber}.</span>
                {match.DateLastPlayed && <span>It was last played {match.GapSinceLastPlay} shows before on {match.DateLastPlayed}.
                    {/*
                    <span> song #{match.LastPosition} of set {match.LastSetNumber}</span> */}
                </span>}
                </p>
            </div>
            :<div className='spacer'></div>}
            {typeof(song) === 'object' ? 
                <div className='show-back' onClick={() => window.history.back()}>
                    <i><Back className="back"></Back></i>
                </div> : 
                <Link className='show-back' to={`/song/6238`}>
                    <i><Back className="back"></Back></i>
                </Link>}
            {showInfo.event
             && <div className='head1'> 
                <p>{bandName}</p>
                {showInfo.dateTime === null && <p className='head2'>{formatDate(showInfo.event.startDate)}</p>}
                {showInfo.event.festival !== null && <p className='head2'>{showInfo.event.festival.name}</p> }
                {showInfo.event.name && <p className='head2'>{showInfo.event.name}</p> }
                {formatDate(showInfo.dateTime) !== "December 31, 1969" && <p className='head2'>{formatDate(showInfo.dateTime)}</p>}
                {showInfo.postNotes && <p className='head2'>{showInfo.postNotes}</p>}
                <p className='head2'>{showInfo.event.venue.name}<span className='head3'> - {showInfo.event.venue.locale}</span></p>
            </div>}   
            {!show.length && <p className="alert" ></p>}
            {show.length ?
                <article className='setList'>
                    <div className='set'>
                        <p>Set 1</p>
                        <p>-----------------------</p>
                        {songsToDisplayOne}
                            
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
                : 
                <div className="load-wrapp">
                    <div className="load-9">
                        <p>Loading</p>
                        <div className="spinner">
                            <div className="bubble-1"><Attended></Attended></div>
                            <div className="bubble-2"><Attended></Attended></div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default Show;

Show.propTypes = {
    plays: propTypes.array,
    showID: propTypes.string,
    bandName: propTypes.string
}