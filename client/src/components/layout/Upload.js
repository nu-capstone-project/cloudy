import React, { Component } from 'react';
import './Upload.css';
import Axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null
    };
  }

  onFileChangeHandler = e => {
    this.setState({
      selectedFiles: e.target.files
    });
  };

  onUploadClickHandler = e => {
    // The file from a state is appended as a file to FormData
    let data = new FormData();
    for (var x = 0; x < this.state.selectedFiles.length; x++) {
      data.append('file', this.state.selectedFiles[x]);
    }
    Axios.post('/api/files/upload', data).then(res => {
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <>
        <div class='files'>
          <input type='file' multiple onChange={this.onFileChangeHandler} />
        </div>
        <br />
        <center>
          <button
            type='button'
            style={{ width: '80%', height: 50 }}
            class='btn waves-effect waves-light green'
            onClick={this.onUploadClickHandler}>
            Upload Files
          </button>
        </center>
      </>
    );
  }
}

export default Upload;
