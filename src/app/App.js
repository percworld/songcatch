import React from 'react';
import Form from '../Form';
import Nav from '../Components/nav/Nav'
import Songs from '../Components/songs/Songs';
import Shows from '../Components/shows/Shows';
import Song from '../Components/song/Song';
import Header from '../Components/header/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { getSongs, getPlays, getTourById } from '../api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      category: 'All',  // cover, original  accesses Cover: boo
      songs: [],
      song: {},
      playlist: []
    }
  }

  componentDidMount() {
    getSongs()
      .then(response => this.setState({ songs: response }))
  }

  updateCategory = (newCategory) => {
    this.setState({ category: newCategory })
  }

  // setSong = (songID) => {
  //   this.setState({ song: getSong(songID) });
  // }

  // setSong = async (songID) => {
  //   try {
  //     const songDetails = await getSong(songID);
  //     this.setState({ song: songDetails });
  //     console.log(songDetails);
  //     // const playDetails = await getPlays(songID);
  //     // console.log(playDetails);
  //   } catch {
  //     throw new Error('Whyyyy')
  //   }
  // }
  setSong = async (song) => {
    try {
      this.setState({ song: song });
      const playDetails = await getPlays(song.Id);
      this.setState({ playlist: playDetails.aaData })
      console.log(this.state.playlist); //this.state.playlist.Venue.Locale  .Venue.Name (venue owns Id too)
    } catch {
      throw new Error('Whyyyy')
    }
  }

  render() {
    // console.log("Songs: ", this.state)
    return (
      <main className="App" >
        <Switch>
          <Route exact path="/" render={() => (<Nav updateCategory={this.updateCategory} />)} />
          <Route path="/shows" render={() => (<Shows plays={this.state.playlist} songs={this.state.songs} />)} />
          <Route path="/festivals" render={() => (<>festivals</>)} />

          {/* <Route path="/originals" isOriginals={true} render={() => (<Songs songs={this.state.songs} />)} />
              <Route path="/covers" og={false} render={() => (<Songs songs={this.state.songs} />)} /> */}
          <Route path="/songs" render={() => (<Songs category={this.state.category} songs={this.state.songs} setSong={this.setSong} />)} />
          <Route path="/:song" render={({ match }) => {
            const songID = match.params.song;
            return (<Song song={this.state.song} plays={this.state.playlist} />)
          }} />
        </Switch>
      </main>
    );
  }
}

export default App;
