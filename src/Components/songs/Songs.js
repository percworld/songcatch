import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Songs.scss';
import Search from '../search/Search';
import './Songs.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

const Songs = ({ songs, category, setSong, searchSongName, bandName, favorites }) => {
    
        
    const categoryFilteredSongs = songs.filter(song => {
        switch (category) {
            case 'All':
                return true;
            case 'Original': return !song.Cover;
            case 'Cover': return song.Cover;
            default: return true;
        }
    })
    const filteredSongs = categoryFilteredSongs.sort((a,b) => {
        return a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' });
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
            <p className='headSongs'>{window.location.pathname === '/songs/favorites' && 'My Favorite'} {bandName} {category === 'All' ? null : category} Songs - {categoryFilteredSongs.length} Total</p>
            <Search searchSongName={searchSongName}></Search>
            <div className='songs-back' onClick={() => window.history.back()}>
							<i><Back className="back"></Back></i>
			</div>
            <div className='trackContainer'>{songsToDisplay}
             {favorites && !favorites.length && <p className='instructions' data-cy='error-no-plays'>When viewing a song's plays, you may add to this list by clicking the heart next to the song title.</p>}
            </div>
        </section>

    )

}

export default Songs;

Songs.propTypes = {
    songs: propTypes.array,
    setSong: propTypes.func,
    bandName: propTypes.string,
    category: propTypes.string,
    searchSongName: propTypes.func,
    favorites: propTypes.array
}
