import React from 'react';
import Form from '../Form';
import Nav from '../Components/nav/Nav'
import Songs from '../Components/songs/Songs';
import Show from '../Components/show/Show';
import Song from '../Components/song/Song';
import Header from '../Components/header/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { getSongs, getPlays, getTourById, getSet } from '../api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      category: 'All',
      songs: [],
      song: {},
      playlist: [],
      currentShow: [],
      favorites: []
    }
  }

  componentDidMount() {
    getSongs()
      .then(response => this.setState({ songs: response }))
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
      this.setState({ song: song });
      const playDetails = await getPlays(song.id || song.Id);
      this.setState({ playlist: playDetails.aaData })
      console.log('List of Plays: ', this.state.playlist); //this.state.playlist.Venue.Locale  .Venue.Name (venue owns Id too)
      console.log('current song: ', this.state.song)  // has lowercase id!
    } catch {
      throw new Error('This song has not been played yet.')
    }
  }

  addFavorite = (song) => {
    !this.state.favorites.includes(song) && this.setState({ favorites: [...this.state.favorites, song] })
  }

  render() {

    return (
      <main className="App" >
        <Header />
        <Switch>
          <Route exact path="/" render={() => (<Nav updateCategory={this.updateCategory} />)} />
          <Route path="/festivals" render={() => (<>festivals</>)} />
          <Route path="/songs/favorites" render={() => (<Songs category={'All'} songs={this.state.favorites} plays={this.state.playlist} setSong={this.setSong} favorites={this.state.favorites} />)} />
          <Route path="/songs" render={() => (<Songs category={this.state.category} songs={this.state.songs} plays={this.state.playlist} setSong={this.setSong} />)} />
          <Route path="/show/:showID" render={({ match }) => {
            const { showID } = match.params;
            return (<Show plays={this.state.playlist} song={this.state.song} showID={showID} show={this.state.currentShow} updateShow={this.updateShow} />)
          }} />
          <Route path="/song/:song" render={({ match }) => {
            const { song } = match.params
            return (<Song matchedSongID={song} song={this.state.song} plays={this.state.playlist} addFavorite={this.addFavorite} setSong={this.setSong} />)
          }} />
        </Switch>
      </main>
    );
  }
}

export default App;
