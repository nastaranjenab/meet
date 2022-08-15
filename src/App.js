import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';



class App extends Component {

  state = {
      events: [],
      locations: [],
      locationSelected: 'all',
      numberOfEvents: 32,
      showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
    true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
this.setState({ showWelcomeScreen: !(code || isTokenValid) });
if ((code || isTokenValid) && this.mounted) {
getEvents().then((events) => {
if (this.mounted) {
this.setState({ events, locations: extractLocations(events) });
}
});
}
}

  componentWillUnmount(){
    this.mounted = false;
  }
  
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

render() {
  if (this.state.showWelcomeScreen === undefined) return <div className="App" />;
  const { locations, numberOfEvents } = this.state;
  return (
      <div className="App">
          <CitySearch 
              locations={this.state.locations}  
              updateEvents={this.updateEvents} />
          <NumberOfEvents 
              events={this.state.events}
              updateEvents={this.updateEvents}/>
          <EventList 
              events={this.state.events}/>
                      <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />        
      </div>
  );
}
}



export default App;