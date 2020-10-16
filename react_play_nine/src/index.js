import React, {Component} from 'react';
import { render } from 'react-dom';
import './styles.css';

import Game from './components/game';

class App extends Component {
    render() {
      return (
        <div>
          <Game />
        </div>
      )
    }
  }
  render(<App />, document.getElementById('root'));