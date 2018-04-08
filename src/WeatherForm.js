import React, { Component } from 'react';

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

  export default WeatherForm;