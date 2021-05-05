import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToursByBandID } from '../../api';
import { formatDate } from '../../utilities';
import './Tours.scss';

const Tours = ({ bandName, bandID }) => {
    const [tours, setTours] = useState([])
    useEffect(() => {
        const updateTours = async () => {
            try {
                const listings = await getToursByBandID(bandID);
                setTours(listings)
            } catch {
                throw new Error(`No Tours Available for ${bandName}`)
            }
        }
        updateTours()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toursToDisplay = tours.map(tour => {
        return (
            <section className='tourSingle' key={tour.id}>
                <Link to={`/tour/${tour.id}`}>
                    <span>{tour.name}</span>
                </Link>
                <p>{tour.showCount} shows<span> - beginning {formatDate(tour.startDate)} </span> </p>
            </section>
        )
    })

    return (
        <section>
            {tours.length ?
                <article className='tourList'>
                    <div className='tourBandName'>{bandName} Tours: {tours.length}</div>
                    {toursToDisplay}
                </article>
                : <p>Loading...</p>}

        </section>
    )
}
export default Tours;

Tours.propTypes = {
    bandName: propTypes.string,
    bandID: propTypes.number
}