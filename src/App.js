import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import logo from './logo.png';
import './App.css';

class App extends Component {
  json = {
    elements: [
      {
        type: 'text',
        name: 'customerName',
        title: 'What is your name?',
        isRequired: true
      }
    ]
  };

  onComplete(survey) {
    console.log('Survey results: ' + JSON.stringify(survey.data));
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>eCommerce Category Mappings Comparison</h1>
        </header>

        <Survey.Survey json={this.json} onComplete={this.onComplete} />
      </div>
    );
  }
}

export default App;
