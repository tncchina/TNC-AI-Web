'use strict';

import React from 'react';
import { Link } from 'react-router';
import { MyUploader} from './MyUploader';

export default class AthletePreview extends React.Component {
  render() {
    return (
      <Link to={`/athlete/${this.props.id}`}>
        <div className="athlete-preview">
          <img src={`img/${this.props.image}`}/>
          <h2 className="name">{this.props.name}</h2>
          <span className="medals-count"><img src="/img/medal.png"/> {this.props.medals.length}</span>
          <MyUploader />
        </div>
      </Link>
    );
  }
}


