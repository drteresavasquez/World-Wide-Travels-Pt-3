import React, { Component } from 'react';
import ToggleableWeatherForm from './ToggleableWeatherForm';
import EditableWeatherList from './EditableWeatherList';

class WeatherDashboard extends Component{
  state = {      
      locations: [
          {id: 1, zip: 38652},
          {id: 2, zip: 37204},
          {id: 3, zip: 32004},
        ]
      }

      handleCreateFormSubmit = (location) => {
        this.createLocation(location);
      };

      handleEditFormSubmit = (attrs) => {
        this.updateWeather(attrs);
      };
    
      createLocation = (location) => {
        const l = this.newWeather(location);
        this.setState({
          locations: this.state.locations.concat(l),
        });
      };

      updateWeather = (attrs) => {
        this.setState({
          locations: this.state.locations.map((location) => {
            if (location.id === attrs.id) {
              return Object.assign({}, location, {
                zip: attrs.zip,
              });
            } else {
              return location;
            }
          }),
        });
      };

      newWeather = (attrs = {}) => {
        const location = {
          zip: attrs.zip || 'ZIP',
          id: this.state.locations.length + 1
        };
    
        return location;
      }
    
    handleTrashClick = (locationId) => {
        this.deleteLocation(locationId);
    };

    deleteLocation = (locationId) => {
      this.setState({
        locations: this.state.locations.filter(l => l.id !== locationId),
      });
    };

    render() {
        return (
          <div className='one column stackable ui grid centered'>
              <div className='column'>
                <div class="ui segment">
                  <EditableWeatherList 
                    locations={this.state.locations} 
                    onFormSubmit={this.handleEditFormSubmit}
                    onTrashClick={this.handleTrashClick}
                  />
                  <ToggleableWeatherForm onFormSubmit={this.handleCreateFormSubmit}/>
              </div>
            </div>
          </div>
        );
      }
}

export default WeatherDashboard;