import React, { Component } from 'react';

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
          <div className='ui three column centered grid'>
              <div className='column'>
            <EditableWeatherList 
              locations={this.state.locations} 
              onFormSubmit={this.handleEditFormSubmit}
              onTrashClick={this.handleTrashClick}
            />
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
          key={location.id}
          id={location.id}
          zip= {location.zip}
          onFormSubmit={this.props.onFormSubmit}
          onTrashClick={this.props.onTrashClick}
        />
      ))
      return (
        <div>
          {locations}
        </div>
      );
    }
  }
  
class EditableWeather extends Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (location) => {
    this.props.onFormSubmit(location);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
          <WeatherForm
            id={this.props.id}
            zip={this.props.zip}
            onFormSubmit={this.handleSubmit} 
            onFormClose={this.handleFormClose}
          />
        );
      } else {
        return (
          <Weather
            id={this.props.id}
            zip={this.props.zip}
            onEditClick={this.handleEditClick}
            onTrashClick={this.props.onTrashClick}
          />
        );
      }
    }
  }
  
class WeatherForm extends Component {
  state = {
    zip: this.props.zip || '',
    };
  
    handleZipChange = (e) => {
      this.setState({ zip: e.target.value });
    };

    handleSubmit = () => {
      this.props.onFormSubmit({
        id: this.props.id,
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
              <label>ZIP</label>
              <input
                type='number'
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
  
class Weather extends Component{
  state={
    weather:'',
    city:'',
    error: null
  }

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount(){
    this.getWeather()
  }

  getWeather = () => {
    let zipCode = this.props.zip
    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=ea4decbd9523a788936a0d1c56cb5751&units=imperial`
    fetch(url)
    .then(result => result.json())
    .then(
        (result) => {
            this.setState({
              weather: result.weather[0].main,
              city: result.name,
              temp: result.main.temp,
            })
        },
        (error) => {
          this.setState({
            error: error
          })
        }
    )
  }

  render(){
    return(
        <div className='ui centered card'>
            <div className='content'>
                <div className='header'>
                {this.state.city}
                </div>
                <div className='meta'>
                {this.props.zip}
                </div>
                <div className='center aligned description'>
                    <h2>
                        {this.state.temp} &#176;F
                    </h2>
                    <div className='weather'>
                        {this.state.weather}
                    </div>
                </div>
                <div className='extra content'>
                <span
                  className='right floated edit icon'
                  onClick={this.props.onEditClick}
                >
                   <i className='edit icon' />
                </span>
                <span
                  className='right floated trash icon'
                  onClick={this.handleTrashClick}
                >
                        <i className='trash icon'/>
                    </span>
                </div>
            </div>
        </div>
    )
  }
}

  export default WeatherDashboard;