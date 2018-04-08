import React, { Component } from 'react';

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

  export default Weather;