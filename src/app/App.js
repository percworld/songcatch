import React from 'react';
import Form from '../Form';
import Songs from '../Songs';
import Song from '../song/Song';
// import Covers from './Covers';
// import Originals from './Originals';
import Header from '../header/Header';
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


  render() {
    console.log("Songs: ", this.state)
    return (
      <main className="App" >
        <nav>
          <Header />
        </nav>
        <Switch>
          <Route exact path="/" render={() => (<Form />)} />
          {/* <Route path="/originals" isOriginals={true} render={() => (<Songs songs={this.state.songs} />)} />
          <Route path="/covers" og={false} render={() => (<Songs songs={this.state.songs} />)} /> */}
          <Route path="/songs" render={() => (<Songs category={this.state.category} songs={this.state.songs} />)} />
          <Route path="/:song" render={({ match }) => {
            return (<Song songID={match.params.song} />)
          }} />
        </Switch>
      </main>
    );
  }
}

export default App;
