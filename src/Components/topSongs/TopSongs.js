import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopSongs.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { getSongsByPlaycount } from '../../api';

const TopSongs = ({ bandID, category, setSong, searchSongName, bandName, favorites }) => {
  const [topSongsList, setTopSongsList] = useState([]);

  const getTopSongs = async () => {
    const unorderedSongs = await getSongsByPlaycount(bandID);
    const orderedSongs = unorderedSongs.reverse();
    setTopSongsList(orderedSongs);
  }
  getTopSongs();

  const songsToDisplay = topSongsList.map((song, index) => {
    return (
      <section className='songSingle' key={index}>
        {song.Id
          ? <Link to={`/song/${song.Id}`} className='topSongTitle' onClick={() => setSong(song)} >
            <p>{song.name || song.Name}<span className='playCounts'>{song.playCount}</span></p>            
          </Link>
          : <Link to={`/song/${song.id}`} className='topSongTitle' onClick={() => setSong(song)} >
            <p>{song.name || song.Name}<span className='playCounts'>{song.playCount}</span></p>
          </Link>
        }
      </section>
    )
  })

  return (
    <section className='songList' data-cy='song-list'>
      <p className='headSongs'>{bandName} {category === 'All' ? null : category} Top Songs</p>
      <div className='songs-back' onClick={() => window.history.back()}>
        <i><Back className="back"></Back></i>
      </div>
      
      <Link to='songs' className='list-by-pop'>List Alphabetically Instead<span className='playCounter'>Plays</span></Link>
      <div className='trackContainer'>{songsToDisplay}
        {favorites && !favorites.length && <p className='instructions' data-cy='error-no-plays'>When viewing a song's plays, you may add to this list by clicking the heart next to the song title.</p>}
      </div>
    </section>
  )
}

export default TopSongs;

TopSongs.propTypes = {
  songs: propTypes.array,
  setSong: propTypes.func,
  bandName: propTypes.string,
  category: propTypes.string,
  searchSongName: propTypes.func,
  favorites: propTypes.array
}
