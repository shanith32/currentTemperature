import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      temperature: null,
      city: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTemperature() {
    if (this.state.weather !== null) {
      const { weather } = this.state;
      console.log("Temperature: ", weather.main.temp);
      const temperature = `${parseInt(weather.main.temp)} °F`;
      this.setState({ temperature: temperature });
    }
  }

  getWeather(city) {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&mode=json&appid=e7f2d9ee3634d4d1e2190332c802601d`
    })
      .then(response => {
        console.log("Weather: ", response.data);
        this.setState({ weather: response.data });
        this.getTemperature();
      })
      .catch(error => {
        console.log("API ERROR: ", error);
        this.setState({ temperature: null });
        alert("Wrong city name!");
      });
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleSubmit(event) {
    console.log("City: ", this.state.city);
    this.getWeather(this.state.city);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Get Current Temperature{" "}
            <span role="img" aria-label="Thermometer">
              🌡️
            </span>
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              City Name?
              <input
                type="text"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <h1>{this.state.temperature}</h1>
        </header>
      </div>
    );
  }
}

export default App;
