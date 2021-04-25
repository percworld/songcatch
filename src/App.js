import React from 'react';
import Form from './Form';
import Songs from './Songs';
import Song from './Song';
// import Covers from './Covers';
// import Originals from './Originals';
import Header from './Header';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { getSongs, getTourById } from './utilities';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDashboard: false,
      isLogged: false,
      isOriginals: true,
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
          <Route path="/originals" og={this.state.isOriginals} render={() => (<Songs songs={this.state.songs} />)} />
          <Route path="/covers" og={this.state.isOriginals} render={() => (<Songs songs={this.state.songs} />)} />
          <Route path="/songs" render={() => (<Songs songs={this.state.songs} />)} />
          <Route path="/:song" render={() => (<Song />)} />
        </Switch>
      </main>
    );
  }
}

export default App;
