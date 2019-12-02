import React, { Component } from 'react';
import './Upload.css';
import Axios from 'axios';
import M from 'materialize-css';

class Upload extends Component {
  fileInputRef;
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: '',
      errors: '',
      loaded: 0
    };
  }

  checkMimeType = e => {
    let checkType = (type, index) => {
      if (files[index].type === type) {
        // make = -> += to append errors
        err = files[index].type + ' ';
        return false;
      }
      return true;
    };

    let files = e.target.files;
    let err = '';
    // mime types block list
    const types = ['text/javascript'];

    for (let x = 0; x < files.length; x++) {
      types.every(type => checkType(type, x));
    }
    err += 'uploading not supported';
    if (err !== 'uploading not supported') {
      e.target.value = null; // discard selected files
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
        selectedFiles: e.target.files,
        errors: ''
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
    if (this.state.selectedFiles !== '') {
      Axios.post('/api/files/upload', data, {
        onUploadProgress: ProgressEvent => {
          let progress = (ProgressEvent.loaded / ProgressEvent.total) * 100;
          if (progress === 100) {
            M.toast({ html: 'Upload complete.', displayLength: 2000 });
            this.setState({
              selectedFiles: ''
            });
            this.fileInputRef.value = '';
            setTimeout(() => window.location.reload(), 2050);
          }
          this.setState({
            loaded: progress
          });
        }
      })
      // .then(response => {
      //   if (response.data === 'duplicate') {
      //     M.toast({ html: 'Duplicate file.', displayLength: 1000 });}
      // });
    } else {
      this.setState({ errors: 'No files selected.' });
    }
  };

  render() {
    return (
      <>
        <div className='files'>
          <input
            type='file'
            multiple
            onChange={this.onFileChangeHandler}
            ref={ref => (this.fileInputRef = ref)}
          />
        </div>
        <center>
          <div
            className='progress'
            style={{ width: this.state.loaded === 0 ? '0%' : this.state.loaded === 100 ? '0%' : '70%' }}>
            <div className='determinate blue lighten-1' style={{ width: this.state.loaded + '%' }}></div>
          </div>
          <button
            type='button'
            style={{ width: '80%', height: 50 }}
            className='btn waves-effect waves-light green'
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
