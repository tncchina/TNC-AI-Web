import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
}

onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
    fetch('http://localhost:49492/api/storage/photoUpload', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'multipart/form-data',
        'boundary':'---------------------------9051914041544843365972754266',
        'MIME-Version':'1.0'
      },
      body: `-----------------------------9051914041544843365972754266
      Content-Disposition: form-data; name="text/plain"
      
      text default
      -----------------------------9051914041544843365972754266
      Content-Disposition: form-data; name="file1"; filename="a.txt"
      Content-Type: text/plain
      
      Content of a.txt.
      
      -----------------------------9051914041544843365972754266
      Content-Disposition: form-data; name="file2"; filename="a.html"
      Content-Type: text/html
      
      <!DOCTYPE html><title>Content of a.html.</title>
      
      -----------------------------9051914041544843365972754266--`
    })
    console.log("Done");
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
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </div>
    );
  }
}

export default App;
