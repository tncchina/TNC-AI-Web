'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/img/logo-tnc.jpg"/>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            This is layout of web server TNC-China-AI. you want to know more about Node.js and Universal JavaScript? <strong>Checkout <a href="https://nodejsdesignpatterns.com">Node.js Design Patterns</a></strong>.
          </p>

          <p>
            Built with <strong>❤</strong>︎ and <strong>code</strong> by <a href="http://loige.co" target="_blank">Microsoft volunteers</a>.
            Contribute on <a href="https://github.com/tncchina/TNC-AI-Web">GitHub</a>
          </p>
        </footer>
      </div>
    );
  }
}
