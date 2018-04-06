import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import WeatherDashboard from './WeatherDashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <WeatherDashboard />
      </div>
    );
  }
}

export default App;
