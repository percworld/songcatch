import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShowsByTour } from '../../api';
import { formatDate } from '../../utilities';
import './Tour.scss';

const Tours = ({ bandName, tourID }) => {
    const [tour, setTour] = useState([])
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
        return (
            <div className='showsList' key={show.id}>
                <section className='showSingle'>
                    <Link to={`/show/${show.id}`}>
                        <span>{show.band.name} @ {show.venue.name}</span>
                    </Link>
                    <p>{show.venue.locale}<span> - {formatDate(show.dateTime)} </span> </p>
                </section>
            </div>
        )
    })

    return (
        <section>
            {tour.length ?
                <article className='showsContainer'>
                    <div className='bandName'>{tour.length} shows on this tour...</div>
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