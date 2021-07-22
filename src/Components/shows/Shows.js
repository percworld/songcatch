import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { NavLink  } from 'react-router-dom';
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
        return (new Date(show.dateTime) < new Date() && show.status === "Active")
    })
    const showsToDisplay = pastShows.map(show => {
        if (show.hasSetlist === true) {
            return (
                <section className='showContainer' key={show.id}>
                    <NavLink to={`/show/${show.id}`} className='singleShow' activeClassName='activeLink'>
                        <span>{show.venue.name}</span>
                    </NavLink>
                    <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
                </section >
            )
        } else {
            return (
                <section className='showContainer' key={show.id}>
                    <p className='singleShow' activeClassName='activeLink'>
                        <span>{show.venue.name}</span>
                    </p>
                    <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
                    <p>~No setlist posted~</p>
                </section >
            )
        }
    })

    return (
        <section>
            {shows.length ?
                <article className='showList'>
                    <div className='bandName'>{bandName} Shows <span className='count' >({shows.length} on page)</span></div>
                    <div className='buttonWrap'>
                        {pageCounter !== 1 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter - 1)}>
                            <i><Back className="back"></Back></i>
                        </button>}
                        {shows.length > 99 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter + 1)}>
                            <i><Back className="back forward"></Back></i>
                        </button>}
                    </div>
                    <div className='show-back' onClick={() => window.history.back()}>
                        <i><Back className="back backTour"></Back></i>
                    </div>
                    {showsToDisplay}
                    <div className='buttonWrap'>
                        {pageCounter !== 1 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter - 1)}>
                            <i><Back className="back"></Back></i>
                        </button>}
                        {shows.length > 99 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter + 1)}>
                            <i><Back className="back forward"></Back></i>
                        </button>}
                    </div>
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