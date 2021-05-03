import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../../api';
import { formatDate } from '../../utilities';
import './Shows.scss';

const Shows = ({ bandName, bandID }) => {
    const [shows, setShows] = useState([])
    console.log(bandName)
    useEffect(() => {
        const updateShow = async () => {
            try {
                const listings = await getShows(bandID);
                setShows(listings)
            } catch {
                throw new Error(`No Shows Available for ${bandName}`)
            }
        }
        updateShow()
    }, [])

    const showsToDisplay = shows.map(show => {
        console.log(show)

        return (
            <section className='showSingle' key={show.id}>
                <Link to={`/show/${show.id}`}>
                    <span>{show.venue.name}</span>
                </Link>
                <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
            </section>
        )
    })

    return (
        <section>
            {shows.length ?
                <article className='showList'>
                    <div className='bandName'>{bandName} Shows: {shows.length} Total</div>
                    {showsToDisplay}
                </article>
                : <p>Loading...</p>}

        </section>
    )
}
export default Shows;