import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Songs.scss';
import Search from '../search/Search';
import './Songs.scss';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

const Songs = ({ songs, category, setSong, searchSongName, bandName, favorites }) => {
    const sortedSongs = songs.sort((a, b) => {
        if (a.Name < b.Name) {
            return -1;
        }
        if (a.Name > b.Name) {
            return 1;
        }
        return 0;
    });
    const filteredSongs = sortedSongs.filter(song => {
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
                <Link to={`/song/${song.Id}`} onClick={() => setSong(song)} >
                    <li>{song.name || song.Name}</li>
                </Link>
            </section>
        )
    })

    return (
        <section className='songList' data-cy='song-list'>
            <p className='headSongs'>{bandName} {category === 'All' ? null : category} Songs - {filteredSongs.length} Total</p>
            <Search searchSongName={searchSongName}></Search>
						<Link className='songs-back' to="/">
							<i><Back className="back"></Back></i>
						</Link>
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
