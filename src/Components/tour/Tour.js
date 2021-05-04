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
                console.log(listings)
                setTour(listings)
            } catch {
                throw new Error(`This Tour is not Available for ${bandName}`)
            }
        }
        updateTour()
    }, [])

    const tourToDisplay = tour.map(show => {
        console.log(show)

        return (
            <section className='showSingle' key={show.id}>
                <Link to={`/show/${show.id}`}>
                    <span>{show.band.name} @ {show.venue.name}</span>
                </Link>
                <p>{show.venue.locale}<span> - {formatDate(show.dateTime)} </span> </p>
            </section>
        )
    })

    return (
        <section>
            {tour.length ?
                <article className='showList'>
                    <div className='bandName'>{bandName} Shows: {tour.length}</div>
                    {tourToDisplay}
                </article>
                : <p>Loading...</p>}

        </section>
    )
}
export default Tours;