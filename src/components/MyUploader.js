import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import { fail } from 'assert';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

export default class MyUploader extends Component {
    render() {
        return (
            <ImagesUploader
                url="http://localhost:3000/multiple"
                optimisticPreviews={false}
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload multiple images"
            />
        );
    }
}