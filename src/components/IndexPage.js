'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';
const FileUploadWithPreview = require("file-upload-with-preview");

export default class IndexPage extends React.Component {

	render() {

		return (
			<div className="custom-file-container" data-upload-id="myFirstImage">
				<div className="demo-upload-container">
					<div className="custom-file-container" data-upload-id="myFirstImage">
						<label>Upload (Single File) <a href="javascript:void(0)" className="custom-file-container__image-clear" title="Clear Image">x</a></label>
						<label className="custom-file-container__custom-file" >
							<input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
							<input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
							<span className="custom-file-container__custom-file__custom-file-control"></span>
							<a href="javascript:void(0)" className="upload-info-button upload-info-button--first">Submit Single File</a>
						</label>
						<div className="custom-file-container__image-preview"></div>
					</div>

					<div className="custom-file-container" data-upload-id="mySecondImage">
						<label>Upload (Allow Multiple) <a href="javascript:void(0)" className="custom-file-container__image-clear" title="Clear Image">x</a></label>
						<label className="custom-file-container__custom-file" >
							<input type="file" className="custom-file-container__custom-file__custom-file-input" accept="*" multiple />
							<input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
							<span className="custom-file-container__custom-file__custom-file-control"></span>
							<a href="javascript:void(0)" className="upload-info-button upload-info-button--second">Submit Multiple File</a>
						</label>
						<div className="custom-file-container__image-preview"></div>
					</div>
				</div>

				<div className="demo-info-container">
					<div>
						<br />
						
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		var firstUpload = new FileUploadWithPreview('myFirstImage')
		var firstUploadInfoButton = document.querySelector('.upload-info-button--first');
		console.log(firstUploadInfoButton);
		firstUploadInfoButton.addEventListener('click', function () {
			console.log("output from Longhan");
			console.log('First upload:', firstUpload, firstUpload.cachedFileArray);
		});
		//Second upload
		var secondUpload = new FileUploadWithPreview('mySecondImage');
		var secondUploadInfoButton = document.querySelector('.upload-info-button--second');
		secondUploadInfoButton.addEventListener('click', function () {
			console.log('Second upload:', secondUpload, secondUpload.cachedFileArray);
		});
	}
}
