import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../utilities';
import '../shows/Shows.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { ReactComponent as Unattended } from '../icons/unattended.svg';
import { ReactComponent as Attended } from '../icons/attended.svg';

const Shows = ({ bandName, bandID, addShow, removeShow, attendedShows }) => {
  const [shows, setShows] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);

  useEffect(() => {
    setShows(attendedShows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const attendedShowsIDs = attendedShows.map(show => show.id);
  const currBandShows = attendedShows.filter(show => show.band.id === bandID);

  const showsToDisplay = shows.map(show => {
    if (show.hasSetlist === true) {
      return (
        <section className='showContainer' key={show.id}>
          <NavLink to={`/show/${show.id}`} className='singleShow' activeClassName='activeLink'>
            <span>{show.venue.name}</span>
          </NavLink>
          {attendedShowsIDs.includes(show.id)
            ? <Attended className='attended' onClick={() => removeShow(show)}></Attended>
            : <Unattended className='unattended' onClick={() => addShow(show)}></Unattended>}
          <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
        </section>
      )
    } else {
      return (
        <section className='showContainer' key={show.id}>
          <p className='singleShow'>
            <span>{show.venue.name}</span>
            {attendedShowsIDs.includes(show.id)
              ? <Attended className='attended' onClick={() => removeShow(show)}></Attended>
              : <Unattended className='unattended' onClick={() => addShow(show)}></Unattended>}
          </p>
          <p>{show.venue.locale} <span> - {formatDate(show.dateTime)} </span> </p>
          <p>~No setlist posted~</p>
        </section>
      )
    }
  })

  const filterCurrBand = () => {
    setShows(currBandShows)
  }

  return (
    <section>
      {shows.length ?
        <article className='showList'>
          <div className='bandName'>My Attended Shows <span className='count' >({shows.length})</span></div>
          <div className='bandName'>{bandName} Shows <span className='count' >({currBandShows.length} attended)</span></div>
          {shows.length > currBandShows.length && <button className='purpleButton currBandBtn' onClick={() => filterCurrBand()}>Show me only {bandName} shows</button>}
          <div className='buttonWrap'>
            {pageCounter !== 1 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter - 1)}>
              <i><Back className="back"></Back></i>
            </button>}
            {shows.length > 99 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter + 1)}>
              <i><Back className="back forward"></Back></i>
            </button>}
            {pageCounter === 1 && shows.length <= 99 && <div className='buttonSpacer'></div>}
            <span className='attendance'>Attended</span>
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
        : <p>You can add shows here by marking the Attended circle in any show list</p>}

    </section>
  )
}
export default Shows;

Shows.propTypes = {
  bandName: propTypes.string,
  bandID: propTypes.number
}