import React from 'react';
import Nav from '../nav/Nav'
import Songs from '../songs/Songs';
import TopSongs from '../topSongs/TopSongs';
import Show from '../show/Show';
import Shows from '../shows/Shows';
import Tours from '../tours/Tours';
import Tour from '../tour/Tour';
import Song from '../song/Song';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Bands from '../bands/Bands';
import Dashboard from '../dashboard/Dashboard';
import Attended from '../attended/Attended';

import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { getBands, getSongs, getPlays, getSet, getSong } from '../../api'; 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      bands: [],
      bandID: JSON.parse(localStorage.getItem('bandPref')) || 12,
      bandPref: JSON.parse(localStorage.getItem('bandPref')) || 12,
      bandName: localStorage.getItem('bandName') || 'Lotus',
      category: 'All',
      songs: [],
      song: {},
      playlist: [],
      currentShow: [],
      favorites: [],
      shows: [],
    }
  }

  getFavorites() {
    const data = localStorage.getItem('favorites');
    const parsedData = JSON.parse(data);
    parsedData && this.setState({favorites: parsedData})
  }

  getShows() {
    const showsData = localStorage.getItem('shows');
    const parsedData = JSON.parse(showsData);
    parsedData && this.setState({ shows: parsedData })
  }
  
  getBand() {
    const bandPrefData = localStorage.getItem('bandPref');
    const parsedPref = JSON.parse(bandPrefData);
    parsedPref && this.setState({ bandID: parsedPref })
    const bandNamePref = localStorage.getItem('bandName');
    const parsedNamePref = JSON.parse(bandNamePref);
    parsedNamePref && this.setState({ bandName: parsedNamePref })
  }
  
  setBand = (id, name) => {
    getSongs(id)
      .then(response => this.setState({ songs: response, bandID: id, bandName: name }))
  }

  componentDidMount() {
    this.getShows();
    this.getFavorites();
    getSongs(this.state.bandID)
      .then(response => this.setState({ songs: response }));
    getBands()
      .then(response => this.setState({ bands: response }));
  }

  updateCategory = (newCategory) => {
    this.setState({ category: newCategory })
  }

  updateShow = async (showID) => {
    try {
      const show = await getSet(showID);
      this.setState({ currentShow: show })
    } catch {
      throw new Error(`No Set Available for Show #${showID}`)
    }
  }

  setSong = async (song) => {
    try {
      const formattedSong = await getSong(song.Id || song.id)
      this.setState({ song: formattedSong });
      const playDetails = await getPlays(formattedSong.id);
      this.setState({ playlist: playDetails.aaData })
    } catch {
      throw new Error('This song has not been played yet.')
    }
  }

  searchSongName = async (searchText) => {
    const filteredSongs = this.state.songs.filter(song => {
      return song.Name.toLowerCase().includes(searchText.toLowerCase())
    })
    this.setState({ songs: filteredSongs })
    if (!this.state.songs.length || searchText === '') {
      getSongs(this.state.bandID)
        .then(response => this.setState({ songs: response }));
    }
  }

  removeFavorite = (song) => {
    const filteredFavorites = this.state.favorites.filter(favorite => favorite.id !== song.id);
    this.setState({ favorites: filteredFavorites });
    const stringifiedData = JSON.stringify(this.state.favorites);
    localStorage.setItem('favorites', stringifiedData);
  }

  addFavorite = async (song) => {
    await !this.state.favorites.includes(song) && this.setState({ favorites: [...this.state.favorites, song] });
    const stringifiedData = JSON.stringify(this.state.favorites);
    localStorage.setItem('favorites', stringifiedData);
  }

  addShow = async (show) => {
    await !this.state.shows.includes(show) && this.setState({ shows: [...this.state.shows, show] });
    const stringifiedData = JSON.stringify(this.state.shows);
    localStorage.setItem('shows', stringifiedData);
  }

  removeShow = (show) => {
    const filteredShows = this.state.shows.filter(iteratedShow => iteratedShow.id !== show.id);
    this.setState({ shows: filteredShows });
    const stringifiedData = JSON.stringify(this.state.shows);
    localStorage.setItem('shows', stringifiedData);
  }


  render() {
    // let vis = window.toolbar.visible; 
    // vis = false;
    return (
      <main className="App" >
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <Header setBand={this.setBand}/>
        <div className="app-container">
          <Switch>
            <Route exact path="/" render={() => (<Dashboard bandName={this.state.bandName} bandPref={this.state.bandPref} bandID={this.state.bandID} />)} />
            <Route exact path="/nav" render={() => (<Nav updateCategory={this.updateCategory} searchSongName={this.searchSongName} bandName={this.state.bandName}/>)} />
            <Route path="/tours" render={() => (<Tours bandName={this.state.bandName} bandID={this.state.bandID} />)} />
            <Route path="/tour/:tourID" render={({ match }) => {
              const { tourID } = match.params;
              return (<Tour bandName={this.state.bandName} bandID={this.state.bandID} tourID={tourID} addShow={this.addShow} removeShow={this.removeShow} attendedShows={this.state.shows}  />)
            }} />
            <Route path="/shows" render={() => (<Shows bandName={this.state.bandName} bandID={this.state.bandID} addShow={this.addShow} removeShow={this.removeShow} attendedShows={this.state.shows} />)} />
            <Route path="/attended" render={() => (<Attended bandName={this.state.bandName} bandID={this.state.bandID} addShow={this.addShow} removeShow={this.removeShow} attendedShows={this.state.shows} />)} />
            <Route path="/bands" render={() => (<Bands setBand={this.setBand} bands={this.state.bands} />)} />
            <Route path="/projects" render={() => (<>festivals</>)} />
            <Route path="/songs/favorites" render={() => (<Songs category={'All'} songs={this.state.favorites} plays={this.state.playlist} setSong={this.setSong} favorites={this.state.favorites} />)} />
            <Route path="/songs" render={() => (<Songs bandName={this.state.bandName} category={this.state.category} songs={this.state.songs} setSong={this.setSong} searchSongName={this.searchSongName} />)} />
            <Route path="/top-songs" render={() => (<TopSongs bandID={this.state.bandID} bandName={this.state.bandName} category={this.state.category} songs={this.state.songs} setSong={this.setSong} searchSongName={this.searchSongName} />)} />
            <Route path="/show/:showID" render={({ match }) => {
              const { showID } = match.params;
              return (<Show plays={this.state.playlist} song={this.state.song} showID={showID} show={this.state.currentShow} updateShow={this.updateShow} bandName={this.state.bandName} />)
            }} />
            <Route path="/song/:song" render={({ match }) => {
              const { song } = match.params;
              return (<Song bandName={this.state.bandName} matchedSongID={song} song={this.state.song} plays={this.state.playlist} addFavorite={this.addFavorite} removeFavorite={this.removeFavorite} favorites={this.state.favorites} setSong={this.setSong} shows={this.state.shows}/>)
            }} />
          </Switch>
          <Footer />
        </div>
      </main>
    );
  }
}

export default App;
