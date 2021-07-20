import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../../api';
import { formatDate } from '../../utilities';
import './Shows.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

const Shows = ({ bandName, bandID }) => {
    const [shows, setShows] = useState([]);
    const [pageCounter, setPageCounter] = useState(1);

    useEffect(() => {
        const updateShows = async () => {
            try {
                const listings = await getShows(bandID, pageCounter);
                setShows(listings)
            } catch {
                throw new Error(`No Shows Are Available for ${bandName}`)
            }
        }
        updateShows()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCounter])


    const pastShows = shows.filter(show => {      
        return (new Date(show.dateTime) < new Date() && show.status !== "Canceled")
    })
    const showsToDisplay = pastShows.map(show => {
        return (
            <section className='showContainer' key={show.id}>
                <Link to={`/show/${show.id}`} className='singleShow' >
                    <span>{show.venue.name}</span>
                </Link>
                <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
            </section >
        )
    })

    return (
        <section>
            {shows.length ?
                <article className='showList'>
                    <div className='bandName'>{bandName} Shows</div>
                    <div>
                        <button className='purpleButton' onClick={() => setPageCounter(pageCounter - 1)}>
                            <i><Back className="back"></Back></i>
                        </button>
                        <button className='purpleButton' onClick={() => setPageCounter(pageCounter + 1)}>
                            <i><Back className="back forward"></Back></i>
                        </button>
                    </div>
                    {showsToDisplay}
                </article>
                : <p>Loading...</p>}

        </section>
    )
}
export default Shows;

Shows.propTypes = {
    bandName: propTypes.string,
    bandID: propTypes.number
}