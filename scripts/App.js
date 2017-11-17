import React from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
          <div>
              <ul>
                  <li><Link to="/Run">경마게임</Link></li>
              </ul>
          </div>


        );
    }
}
