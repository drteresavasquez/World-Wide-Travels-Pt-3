import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class WeatherDashboard extends Component{
        locations = [
          {id: 1, zip: 37214},
          {id: 2, zip: 37204},
          {id: 3, zip: 37013},
        ]

    componentDidMount(){
        this.getWeather()
    }

    getWeather = () => {
        var url = 'http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=ea4decbd9523a788936a0d1c56cb5751&units=imperial'
        fetch(url)
        .then(result => result.json())
        .then(
            (result) => {
                console.log("RESULT", result);
            },
            (error) => {
                console.log("ERROR", error);
            }
        )
    }

    render() {
        return (
          <div>
            <EditableWeatherList locations={this.locations}/>
          </div>
        );
      }
}

class EditableWeatherList extends Component{
    render() {
      const locations = this.props.locations.map((location) => (
        <EditableWeather
          key={location.id}
          id={location.id}
          zip={location.zip}
        />
      ));
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
      if (this.state.editFormOpen) {
        return (
          <WeatherForm
            id={this.props.id}
            zip={this.props.zip}
          />
        );
      } else {
        return (
          <Weather
            id={this.props.id}
            zip={this.props.zip}
          />
        );
      }
    }
  }
  
  function WeatherForm(){
    return(
      <div>
      {console.log("Weather Form!!!")}
      </div>
    )
  }
  
  function Weather(props){
    return(
        <div className="App">
    <Row>
      <Col>
        <Card body className="Cards">
          <CardTitle>{props.zip}</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card>
        </Col>
        </Row>
      </div>
    )
  }

  export default WeatherDashboard;