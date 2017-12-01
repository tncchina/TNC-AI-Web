'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';

export default class IndexPage extends React.Component {
  render() {
    return (
    	<div onClick={this.function1}>
    	<form ref='uploadForm' id='uploadForm' action='/upload' method='post' encType='multipart/form-data'>
		    Select image to upload:
		    <input type="file" name='sampleFile'/>
		    <input type="submit" value='Upload!' name="submit" />
		</form>
		</div>
    );
  }

  function1() {
  	consol.log("ddd");
  }
}
