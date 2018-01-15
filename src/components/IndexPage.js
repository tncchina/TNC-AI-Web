'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';

export default class IndexPage extends React.Component {
 
	constructor(props){
		super(props);
		// State and lifecycle" https://reactjs.org/docs/state-and-lifecycle.html
		this.state = {date: new Date()};
	}

	
	// http://react-china.org/t/react-fetch/6803/14
//  componentDidMount(){
//     fetch('url-xxx')
//       .then(res => res.json())
// 			this.setState((prevState) => {
// 				return {date: new Date()};
// 			});
// 	}

	 uploadImage(image){		
		 // var formData = new FormData();
		// formData.append('photo', image);
		// fetch('http://localhost:8080/uploadUserImage/', {
		// 	method:'POST',
		// 	body: formData
		// });
	}


	updateDate(){
		console.log("Hi whats up?");
		this.setState({
			date: new Date()
		})
	}

	render() {
		var msg = null;
		if(!this.state.date){
			msg = <p>State date does not exist</p>;
		}else{
			msg = <p>You name it {this.state.date.toLocaleTimeString()}</p>
			
		}

    return (
    	<div>
			<button type="button" onClick={this.updateDate.bind(this)}>Click Me!</button>
    	<form ref='uploadForm' id='uploadForm' action='http://localhost:49492/api/storage/photoUpload' method='post' encType='multipart/form-data'>
		    {msg}
				Select image to upload:
		    <input type="file" name='sampleFile'/>
		    <input type="submit" value='Upload!' name="submit" />
		</form>
		</div>
    );
  };
}
