import React from 'react';
import Nav from '../Components/nav/Nav'
import Songs from '../Components/songs/Songs';
import Show from '../Components/show/Show';
import Song from '../Components/song/Song';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { getBands, getSongs, getPlays, getSet, getSong } from '../api'; //getTourById, 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      bands: [],
      bandID: 12,
      bandName: 'Lotus',
      category: 'All',
      songs: [],
      song: {},
      playlist: [],
      currentShow: [],
      favorites: []
    }
  }

  componentDidMount() {
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
      console.log(song)
      const formattedSong = await getSong(song.Id || song.id)
      this.setState({ song: formattedSong });
      console.log(formattedSong);
      const playDetails = await getPlays(formattedSong.id);
      //console.log('List of Plays: ', playDetails.aaData);
      this.setState({ playlist: playDetails.aaData })
      //console.log('List of Plays: ', this.state.playlist); //this.state.playlist.Venue.Locale  .Venue.Name (venue owns Id too)
      //console.log('current song: ', this.state.song)  // has lowercase id!
    } catch {
      throw new Error('This song has not been played yet.')
    }
  }

  searchSongName = async (searchText) => {
    console.log(searchText);
    const filteredSongs = this.state.songs.filter(song => {
      return song.Name.toLowerCase().includes(searchText.toLowerCase())
    })
    console.log(filteredSongs)
    this.setState({ songs: filteredSongs })
    if (!this.state.songs.length || searchText === '') {
      getSongs(this.state.bandID)
        .then(response => this.setState({ songs: response }));
    }

  }

  removeFavorite = (song) => {
    console.log(song)
    const filteredFavorites = this.state.favorites.filter(favorite => favorite.id !== song.id);
    this.setState({ favorites: filteredFavorites });
  }

  addFavorite = (song) => {
    console.log(song)
    !this.state.favorites.includes(song) && this.setState({ favorites: [...this.state.favorites, song] });
  }

  render() {

    return (
      <main className="App" >
        <Header />
        <Switch>
          <Route exact path="/" render={() => (<Nav updateCategory={this.updateCategory} searchSongName={this.searchSongName} />)} />
          <Route path="/tours" render={() => (<>tours</>)} />
          <Route path="/shows" render={() => (<>festivals</>)} />
          <Route path="/bands" render={() => (<>festivals</>)} />
          <Route path="/projects" render={() => (<>festivals</>)} />
          <Route path="/songs/favorites" render={() => (<Songs category={'All'} songs={this.state.favorites} plays={this.state.playlist} setSong={this.setSong} favorites={this.state.favorites} />)} />
          <Route path="/songs" render={() => (<Songs bandName={this.state.bandName} category={this.state.category} songs={this.state.songs} setSong={this.setSong} searchSongName={this.searchSongName} />)} />
          <Route path="/show/:showID" render={({ match }) => {
            const { showID } = match.params;
            return (<Show plays={this.state.playlist} song={this.state.song} showID={showID} show={this.state.currentShow} updateShow={this.updateShow} />)
          }} />
          <Route path="/song/:song" render={({ match }) => {
            const { song } = match.params
            return (<Song bandName={this.state.bandName} matchedSongID={song} song={this.state.song} plays={this.state.playlist} addFavorite={this.addFavorite} removeFavorite={this.removeFavorite} favorites={this.state.favorites} setSong={this.setSong} />)
          }} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;
