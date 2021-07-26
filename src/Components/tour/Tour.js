import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShowsByTour } from '../../api';
import { formatDate } from '../../utilities';
import './Tour.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { ReactComponent as Unattended } from '../icons/unattended.svg';
import { ReactComponent as Attended } from '../icons/attended.svg';

const Tours = ({ bandName, tourID, addShow, removeShow, attendedShows }) => {
    const [tour, setTour] = useState([]);
    const attendedShowsIDs = attendedShows.map(show => show.id);

    useEffect(() => {
        const updateTour = async () => {
            try {
                const listings = await getShowsByTour(tourID);
                setTour(listings)
            } catch {
                throw new Error(`This Tour is not Available for ${bandName}`)
            }
        }
        updateTour()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tourToDisplay = tour.map(show => {
        if (show.hasSetlist === true) {
            return (
                <div className='showsList' key={show.id}>
                    <section className='showSingle'>
                        <Link to={`/show/${show.id}`}>
                            <span>{show.band.name} @ {show.venue.name}</span>
                        </Link>
                        {attendedShowsIDs.includes(show.id)
                            ? <Attended className='attended' onClick={() => removeShow(show)}></Attended>
                            : <Unattended className='unattended' onClick={() => addShow(show)}></Unattended>}
                        <p>{show.venue.locale}<span> - {formatDate(show.dateTime)} </span> </p>
                    </section>
                </div>
            ) 
        } else {
            return(
            <div className='showsList' key={show.id}>
                <section className='showSingle'>
                    <div>
                        <span>{show.band.name} @ {show.venue.name}</span>
                            {attendedShowsIDs.includes(show.id)
                                ? <Attended className='attended' onClick={() => removeShow(show)}></Attended>
                                : <Unattended className='unattended' onClick={() => addShow(show)}></Unattended>}
                        <p>~no set list for this show~</p>
                        {show.status === 'Rescheduled' && <p>...it was rescheduled</p>}
                        {show.status === 'Canceled' && <p>...it was canceled</p>}
                        {new Date(show.dateTime) > new Date() && <p>It hasn't been played yet!</p>}
                    </div>
                    <p>{show.venue.locale}<span> - {formatDate(show.dateTime)} </span> </p>
                </section>
            </div>
            )
        }
    })

    return (
        <section>
            {tour.length ?
                <article className='showsContainer'>
                    <div className='bandName'>{tour.length} shows on this tour...</div>
                    <div className='show-back' onClick={() => window.history.back()}>
                        <i><Back className="back backTour"></Back></i>
                    </div>
                    {tourToDisplay}
                </article>
                : <p>Loading...</p>}
        </section>
    )
}
export default Tours;

Tours.propTypes = {
    bandName: propTypes.string,
    tourID: propTypes.string
}