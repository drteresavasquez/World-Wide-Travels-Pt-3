import React, { Component } from 'react';
import helpers from './helpers';

class WeatherDashboard extends Component{
  state = {      
      locations: [
          {id: 1, zip: 37214, city: 'Nashville'},
          {id: 2, zip: 37204, city: 'Nashville'},
          {id: 3, zip: 37013, city: 'Antioch'},
        ]
      }

      handleCreateFormSubmit = (location) => {
        this.createLocation(location);
      };
    
      createLocation = (location) => {
        const l = helpers.newWeather(location);
        this.setState({
          locations: this.state.locations.concat(l),
        });
      };

    // componentDidMount(){
    //     this.getWeather()
    // }

    // getWeather = () => {
    //     var url = 'http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=ea4decbd9523a788936a0d1c56cb5751&units=imperial'
    //     fetch(url)
    //     .then(result => result.json())
    //     .then(
    //         (result) => {
    //             console.log("RESULT", result);
    //         },
    //         (error) => {
    //             console.log("ERROR", error);
    //         }
    //     )
    // }

    render() {
        return (
          <div className='ui three column centered grid'>
              <div className='column'>
            <EditableWeatherList locations={this.state.locations} />
            <ToggleableWeatherForm onFormSubmit={this.handleCreateFormSubmit}/>
            </div>
          </div>
        );
      }
}

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

class EditableWeatherList extends Component{
    render() {
      const locations = this.props.locations.map((location) => (
        <EditableWeather
          city={location.city}
          zip= {location.zip}
        />
      ))
      return (
        <div>
          {locations}
        </div>
      );
    }
  }
  
class EditableWeather extends React.Component {
  state = {
    editFormOpen: false,
  };

  render() {
    if (this.props.editFormOpen) {
      return (
          <WeatherForm
            id={this.props.id}
            city={this.props.city}
            zip={this.props.zip}
          />
        );
      } else {
        return (
          <Weather
            id={this.props.id}
            city={this.props.city}
            zip={this.props.zip}
          />
        );
      }
    }
  }
  
class WeatherForm extends Component {
  state = {
    zip: this.props.zip || '',
    city: this.props.city || '',
    };

    handleCityChange = (e) => {
      this.setState({ city: e.target.value });
    };
  
    handleZipChange = (e) => {
      this.setState({ zip: e.target.value });
    };

    handleSubmit = () => {
      this.props.onFormSubmit({
        id: this.props.id,
        city: this.state.city,
        zip: this.state.zip,
      });
    };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>City</label>
              <input
                type='text'
                value={this.state.city}
                onChange={this.handleCityChange}
              />
            </div>
            <div className='field'>
              <label>ZIP</label>
              <input
                type='text'
                value={this.state.zip}
                onChange={this.handleZipChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
            <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
            >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  
  function Weather(props){
    return(
        <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                    {props.city}
                    </div>
                    <div className='meta'>
                    {props.zip}
                    </div>
                    <div className='center aligned description'>
                        <h2>
                           WEATHER WHEN PULLED FROM API
                        </h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i className='edit icon'/>
                        </span>
                        <span className='right floated trash icon'>
                            <i className='trash icon'/>
                        </span>
                    </div>
                </div>
            </div>
    )
  }

  export default WeatherDashboard;