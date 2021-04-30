import React from 'react';
import Form from '../Form';
import Nav from '../Components/nav/Nav'
import Songs from '../Components/songs/Songs';
import Shows from '../Components/shows/Shows';
import Song from '../Components/song/Song';
import Header from '../Components/header/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { getSongs, getTourById } from '../api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      category: 'All',  // cover, original  accesses Cover: boo
      songs: []
    }
  }

  componentDidMount() {
    getSongs()
      .then(response => this.setState({ songs: response }))
  }

  updateCategory = (newCategory) => {
    this.setState({ category: newCategory })
  }

  makeShowList = (songID) => {
    this.setState({ songID: songID });
  }

  render() {
    console.log("Songs: ", this.state)
    return (
      <main className="App" >
        <Switch>
          <Route exact path="/" render={() => (<Nav />)} />
          <Route path="/shows" render={() => (<Shows songs={this.state.songs} />)} />
          {/* <Route path="/originals" isOriginals={true} render={() => (<Songs songs={this.state.songs} />)} />
              <Route path="/covers" og={false} render={() => (<Songs songs={this.state.songs} />)} /> */}
          <Route path="/songs" render={() => (<Songs category={this.state.category} songs={this.state.songs} />)} />
          <Route path="/:song" render={({ match }) => {
            const song = match.params.song;
            this.makeShowlist(song)
            return (<Song songID={song} />)
          }} />
        </Switch>
      </main>
    );
  }
}

export default App;
