import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
import './TopSongs.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';
import { getSongsByPlaycount } from '../../api';
const TopSongs = ({ bandID, category, setSong, searchSongName, bandName, favorites }) => {
  const [topSongsList, setTopSongsList] = useState([]);
  

  // const retrieveSong = async (song) => {
  //   try {
  //     const formattedSong = await getSong(song.Id || song.id)
  //     const playDetails = await getPlays(formattedSong.id);
  //     if (playDetails.aaData.length > 50) {
  //       setTopSongsList([...topSongsList, formattedSong]);
  //     }
  //   } catch {
  //     throw new Error('Song data is not being retrieved.')
  //   }
  // }
  // songs.forEach(song => {
  //   retrieveSong(song) 
  // })

  //GET LIST and reverse / assign last 100
  const topSongs = async () => {
    const unorderedSongs = await getSongsByPlaycount(bandID);
    console.log(unorderedSongs)
    //const orderedSongs = unorderedSongs.reverse();
    //setTopSongsList(orderedSongs);
  }

  topSongs();

  // const sortedSongs = topSongsList.sort((a, b) => {
  //   console.log(a)
  //   if (a.Name < b.Name) {
  //          return -1;
  //      }
  //      return 1;
  // });



  const filteredSongs = topSongsList.filter(song => {
    switch (category) {
      case 'All':
        return true;
      case 'Original': return !song.Cover;
      case 'Cover': return song.Cover;
      default: return true;
    }
  })
  const songsToDisplay = filteredSongs.map((song, index) => {
    return (
      <section className='songSingle' key={index}>
        {song.Id
          ? <Link to={`/song/${song.Id}`} onClick={() => setSong(song)} >
            <li>{song.name || song.Name}</li>
          </Link>
          : <Link to={`/song/${song.id}`} onClick={() => setSong(song)} >
            <li>{song.name || song.Name}</li>
          </Link>
        }
      </section>
    )
  })

  return (
    <section className='songList' data-cy='song-list'>
      <p className='headSongs'>{bandName} {category === 'All' ? null : category} Top Songs - listing {filteredSongs.length} Total</p>
      <Search searchSongName={searchSongName}></Search>
      <div className='songs-back' onClick={() => window.history.back()}>
        <i><Back className="back"></Back></i>
      </div>
      
      <Link to='songs' className='list-by-pop'>List Alphabetically</Link>

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
