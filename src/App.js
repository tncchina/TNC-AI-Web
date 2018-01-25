import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
     this.state = { pictures: [], url:"", prediction:"" };
     this.onDrop = this.onDrop.bind(this);
     //this.onResult = this.onResult.bind(this);
  }

  onDrop = (pictures) => {
    
      var picture = pictures[0]
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });

      var formData = new FormData();
      formData.append(picture.name, picture);
      fetch('http://localhost:49492/api/storage/photoUpload', {
        method: 'POST',
        header: new Headers({
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'multipart/form-data'
      }),
        body: formData
      }).then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log("Name: " + json['PhotoName']);
        console.log("PhotoUrl: " + json['PhotoUrl']);
        console.log("Prediction: " + json['Prediction']);
        this.setState({url: json['PhotoUrl'],prediction: json['Prediction']});
    }).catch(err => console.log(err));
  }


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
        <b> {this.state.prediction} </b>
        <img src={this.state.url} alt='photoUrl'/>
      </div>
    );
  }
}

export default App;


