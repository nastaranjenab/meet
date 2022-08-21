import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap/'
import Header from './Header';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { EventGenre } from './EventGenre';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 15,
    showWelcomeScreen: undefined,
    isOnline: navigator.onLine,
  };

  async componentDidMount() {
    this.mounted = true;
    window.addEventListener("offline", (e) => {
      this.setState({ isOnline: false });
    });
    window.addEventListener("online", (e) => {
      this.setState({ isOnline: true });
    });

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid =
      !window.location.href.startsWith("http://localhost") &&
      !(accessToken && !navigator.onLine) &&
      (await checkToken(accessToken)).error
        ? false
        : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    !location
      ? (location = this.state.currentLocation)
      : this.setState({ currentLocation: location });
    !eventCount
      ? (eventCount = this.state.numberOfEvents)
      : this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
      });
    });
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  
     render() {
         if (this.state.showWelcomeScreen === undefined) return <div className="App" />
        
        return ( 
            <div className = "App">
            {!navigator.onLine && <OfflineAlert text={'You are currently offline, data may be not updated.'}/>}
            <Header / >
            <Container>
                    <Row className="d-flex justify-content-center align-item-center p-3 m-3">
                            <Col md={6} className="d-flex flex-column align-items-center justify-content-center p-5">
                                    <NumberOfEvents updateEvents = { this.updateEvents } />
                                    <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } />  
                            </Col>
                            <Col md={6} className='data-vis-wrapper d-flex flex-column'>
                                    <EventGenre events={this.state.events} />
                            </Col>
                            <Col  md={12} className="d-flex flex-column align-items-center justify-content-around p-5">
                                    <h6 className="text-muted">Distribution of event amounts by city</h6>
                                    <ResponsiveContainer height={250} >
                                        <ScatterChart
                                                margin={{
                                                    top: 20, right: 20, bottom: 20, left: 20,
                                                }}
                                                >
                                                <CartesianGrid />
                                                <XAxis type="category" dataKey="city" name="City" />
                                                <YAxis type="number" dataKey="number" name="Events" allowDecimals={false} />
                                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                                <Scatter data={this.getData()} fill="rgba(255, 172, 5, 0.671)" />
                                        </ScatterChart>
                                    </ResponsiveContainer>
                                    
                            </Col>
                    </Row> 
                    <Row>
                    
                    </Row>
            <EventList events = { this.state.events } /> 
            <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
            </Container > 
            </div>
        );
    }
}

export default App;