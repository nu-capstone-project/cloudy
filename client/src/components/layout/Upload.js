import React, { Component } from 'react';
import './Upload.css';
import Axios from 'axios';
import Materialize from 'materialize-css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: '',
      errors: '',
      loaded: 0
    };
  }

  checkMimeType = e => {
    let files = e.target.files;
    let err = '';
    // mime types block list
    const types = ['text/javascript'];
    for (var x = 0; x < files.length; x++) {
      if (
        types.every(type => {
          if (files[x].type === type) {
            err = files[x].type + ' ';
          }
        })
      ) {
      }
    }
    err += 'uploading not supported';
    if (err !== 'uploading not supported') {
      e.target.value = null; // discard selected file
      this.setState({
        errors: err
      });
      return false;
    }
    return true;
  };

  onFileChangeHandler = e => {
    if (this.checkMimeType(e)) {
      this.setState({
        selectedFiles: e.target.files
      });
    }
  };

  onUploadClickHandler = e => {
    this.setState({
      errors: ''
    });
    // The file from a state is appended as a file to FormData
    let data = new FormData();
    for (var x = 0; x < this.state.selectedFiles.length; x++) {
      data.append('file', this.state.selectedFiles[x]);
    }
    Axios.post('/api/files/upload', data, {
      onUploadProgress: ProgressEvent => {
        let progress = (ProgressEvent.loaded / ProgressEvent.total) * 100;
        if (progress === 100) {
          Materialize.toast({ html: 'Upload complete.', displayLength: 2000 });
        }
        this.setState({
          loaded: progress
        });
      }
    }).then(res => {
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <>
        <div class='files'>
          <input type='file' multiple onChange={this.onFileChangeHandler} />
        </div>
        <center>
          <div
            className='progress'
            style={{ width: this.state.loaded === 0 ? '0%' : this.state.loaded === 100 ? '0%' : '70%' }}>
            <div className='determinate green' style={{ width: this.state.loaded + '%' }}></div>
          </div>
          <button
            type='button'
            style={{ width: '80%', height: 50 }}
            class='btn waves-effect waves-light green'
            onClick={this.onUploadClickHandler}>
            Upload Files
          </button>
          <p className='red-text'>{this.state.errors}</p>
        </center>
      </>
    );
  }
}

export default Upload;
