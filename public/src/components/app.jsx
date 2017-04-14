import React, { Component } from 'react';

export default class App extends Component {

  //********** Main Div in the application which will contain all components as children ****/
  render() {
    return (
      <div className="easy-up-container">
        {this.props.children}
      </div>
    );
  }
}
