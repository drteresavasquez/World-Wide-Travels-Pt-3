import React, { Component } from 'react';
import WeatherForm from './WeatherForm';

class ToggleableWeatherForm extends Component {
    state = {
      isOpen: false,
    };
  
    handleFormOpen = () => {
      this.setState({ isOpen: true });
    };
  
    handleFormClose = () => {
      this.setState({ isOpen: false });
    };
  
    handleFormSubmit = (location) => {
      this.props.onFormSubmit(location);
      this.setState({ isOpen: false });
    };
  
    render() {
      if (this.state.isOpen) {
        return (
          <WeatherForm 
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          />
        );
      } else {
        return (
          <div className='ui basic content center aligned segment'>
          <button
              className='ui basic button icon'
              onClick={this.handleFormOpen}
          >
              <i className='plus icon' />
            </button>
          </div>
        );
      }
    }
  }

export default ToggleableWeatherForm;