import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import logo from './logo-nature-notagline.png';
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
      fetch('https://tnc-ai-web-api.azurewebsites.net/api/storage/photoUpload', {
        method: 'POST',
        mode: 'cors',
        header: new Headers({
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin':'*'
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
            <img src={logo} alt="logo" />
            <h1 className="App-title">Welcome to TNC-AI</h1>
          </header>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.JPG', '.gif', '.png', '.PNG', '.gif']}
          maxFileSize={5242880}
        />
        <figure>
          <figcaption> {this.state.prediction} </figcaption>
          <img src={this.state.url} alt='photoUrl'/>
        </figure>
      </div>
    );
  }
}

export default App;


