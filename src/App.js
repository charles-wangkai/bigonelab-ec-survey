import React, { Component } from 'react';
import * as Survey from 'survey-react';
import surveyData from './survey.json';
import 'survey-react/survey.css';
import logo from './logo.png';
import './App.css';

class App extends Component {
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

        <Survey.Survey json={surveyData} onComplete={this.onComplete} />
      </div>
    );
  }
}

export default App;
