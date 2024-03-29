import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../utilities';
import '../shows/Shows.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { ReactComponent as Unattended } from '../icons/unattended.svg';
import { ReactComponent as Attended } from '../icons/attend.svg';
import './Attended.scss';

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

  const resetToAll = () => {
    setShows(attendedShows)
  }

  return (
    <section>
      <div className='show-back' onClick={() => window.history.back()}>
        <i><Back className="back backBands"></Back></i>
      </div>
      {attendedShows.length ?
        <article className='showList'>
          <div className='bandName'>My Attended Shows <span className='count' >({attendedShows.length})</span></div>
          <div className='bandName'>{bandName} Shows <span className='count' >({currBandShows.length} attended)</span></div>
          {attendedShows.length > currBandShows.length && shows.length !== currBandShows.length && <button className='purpleButton currBandBtn' onClick={() => filterCurrBand()}>Display only {bandName} shows</button>}
          {shows.length < attendedShows.length && <button className='purpleButton currBandBtn' onClick={() => resetToAll()}>Display shows from all bands</button>}

          <div className='buttonWrap'>
            {pageCounter !== 1 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter - 1)}>
              <i><Back className="back"></Back></i>
            </button>}
            {shows.length > 99 && <button className='purpleButton' onClick={() => setPageCounter(pageCounter + 1)}>
              <i><Back className="back forward"></Back></i>
            </button>}
            {pageCounter === 1 && shows.length <= 99 && <div className='buttonSpacer'></div>}
          </div>
          <span className='attendance'>I Was There!</span>
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
        : 
        <div className="load-wrapp">
          <p className="no-shows">You can add shows here by marking the circle under "I Was There!" in any show list</p>
          {/* <div className="load-9">
            <p>Loading</p>
            <div className="spinner">
              <div className="bubble-1"><Attended></Attended></div>
              <div className="bubble-2"><Attended></Attended></div>
            </div>
          </div> */}
        </div>}

    </section>
  )
}
export default Shows;

Shows.propTypes = {
  bandName: propTypes.string,
  bandID: propTypes.number
}