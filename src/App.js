import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      city: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTemperature() {
    if (this.state.weather !== null) {
      const { weather } = this.state;
      console.log("TEMP:", weather.main.temp);
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
        console.log("API ERROR", error);
      });
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleSubmit(event) {
    console.log("City:", this.state.city);
    this.getWeather(this.state.city);
    event.preventDefault();
  }

  render() {
    // if (this.state.weather !== null) {
    //   console.log(this.state.weather);
    // }
    // const { weather } = this.state;
    // if (weather !== null) console.log(weather);

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
