import React, { Component } from 'react';
import * as Survey from 'survey-react';
import surveyConfig from './survey.json';
import 'survey-react/survey.css';
import logo from './logo.png';
import './App.css';

const method1 = surveyConfig.customData.method1;
const method2 = surveyConfig.customData.method2;

class App extends Component {
  surveyModel = new Survey.Model(surveyConfig);

  constructor(props) {
    super(props);
    this.state = { score: null };
  }

  computeScore = surveyResult => {
    let score = {};
    score[method1] = 0;
    score[method2] = 0;
    score[0] = 0;

    for (const name in surveyResult) {
      score[surveyResult[name]] += 1;
    }

    return score;
  };

  onComplete = survey => {
    console.log('Survey results: ' + JSON.stringify(survey.data));

    this.setState({ score: this.computeScore(survey.data) });

    survey.clear(false);
    survey.mode = 'display';
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>eCommerce Category Mappings Comparison</h1>
        </header>

        <div className="Survey-header">
          {this.state.score === null ? (
            <h3>
              Please choose a more accurate mapping category for each of the
              following categories.
            </h3>
          ) : (
            <div>
              <h3>Results</h3>
              <p>
                Prefer method "{method1}": <b>{this.state.score[method1]}</b>{' '}
                time(s)
              </p>
              <p>
                Prefer method "{method2}": <b>{this.state.score[method2]}</b>{' '}
                time(s)
              </p>
              <p>
                Draw: <b>{this.state.score[0]}</b> time(s)
              </p>
            </div>
          )}
        </div>

        <Survey.Survey model={this.surveyModel} onComplete={this.onComplete} />
      </div>
    );
  }
}

export default App;
