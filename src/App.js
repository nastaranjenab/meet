import "./nprogress.css";
import "./App.css";
import React, { Component } from "react";
import NumberOfEvents from "./NumberOfEvents";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { OfflineAlert } from "./Alert";

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

  render() {
    const { showWelcomeScreen } = this.state;

    if (showWelcomeScreen === undefined) {
      return <div className="App" />;
    } else if (showWelcomeScreen === true) {
      return (
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );
    } else {
      return (
        <div className="App">
          <div className="offline_alert_container">
            {!this.state.isOnline && (
              <OfflineAlert
                style={{ top: 0 }}
                text={
                  "You are offline. An updated list will be loaded when you are back online."
                }
              />
            )}
          </div>
          <CitySearch
            updateEvents={this.updateEvents}
            locations={this.state.locations}
          />{" "}
          <NumberOfEvents updateEvents={this.updateEvents} />
          <EventList events={this.state.events} />
        </div>
      );
    }
  }
}

export default App;