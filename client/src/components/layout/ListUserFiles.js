import React, { Component } from 'react';
import Axios from 'axios';
import FlipMove from 'react-flip-move';
import Download from 'js-file-download';
import { Modal } from 'react-materialize';
import { isUndefined } from 'util';
import M from 'materialize-css';

class ListUserFiles extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      newName: ''
    };
  }

  componentDidMount() {
    Axios.post('/api/files/list')
      .then(response => {
        if (response.data.length > 0) {
          let files = response.data;
          // default size in bytes, need to convert
          files.forEach((part, index) => {
            files[index].size = this.formatBytes(files[index].size);
            let parsedDate = new Date(files[index].modified);
            files[index].modified = parsedDate.toString().substring(0, 21);
          });
          this.setState({
            files: files
          });
        }
      })
      .catch(err => console.log(err));
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  handleActionClick = (e, fileName) => {
    if (e.target.innerText === 'delete') {
      // delete case
      Axios.delete('/api/files/delete/' + fileName)
        .then(response => {
          if (response.data === 'deleted') {
            M.toast({ html: 'Deleted file.', displayLength: 1000 });
            this.state.files.forEach((fileObj, index) => {
              if (fileObj.name === fileName) {
                let files = this.state.files.splice(0);
                files.splice(index, 1);
                this.setState({ files: files });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (e.target.id === 'do-rename') {
      if (this.state.newName !== '') {
        console.log(fileName);
        // rename file
        Axios.post('/api/files/rename/' + fileName, { newName: this.state.newName })
          .then(res => {
            if (res.data === 'renamed') {
              M.toast({ html: 'Renamed file.', displayLength: 1000 });
              setTimeout(() => window.location.reload(), 1050);
            }
          })
          .catch(err => {
            M.toast({ html: err, displayLength: 1000 });
          });
      } else {
        M.toast({ html: 'No file name specified.', displayLength: 1000 });
      }
    }
  };

  handleRowClick = async (e, fileName) => {
    Axios.get('/api/files/get/' + fileName)
      .then(res => {
        Download(res.data, fileName);
      })
      .catch(err => {
        M.toast({ html: err });
      });
  };

  onChange = e => {
    if (!isUndefined(e.target)) {
      this.setState({ newName: e.target.value });
    } else this.setState({ newName: '' });
  };

  render() {
    let fileRows = this.state.files.map(fileObj => {
      let fileRows = [];
      fileRows.push(
        <File
          key={fileObj.name + fileObj.size}
          name={fileObj.name}
          modified={fileObj.modified}
          size={fileObj.size}
          onRowClick={this.handleRowClick}
          onClick={this.handleActionClick}
          onChange={this.onChange}
        />
      );
      return fileRows;
    });
    return (
      <FlipMove leaveAnimation='elevator' appearAnimation='elevator'>
        <table className='highlight'>
          <thead>
            <tr className='grey-text text-darken-2'>
              <th>Name</th>
              <th>Last Modified</th>
              <th>File Size</th>
              <th className='center'>Actions</th>
            </tr>
          </thead>
          <tbody>{fileRows}</tbody>
        </table>
      </FlipMove>
    );
  }
}

function File(props) {
  const triggerBtn = (
    <button className='material-icons-outlined btn-flat' onClick={e => props.onClick(e, props.name)}>
      create
    </button>
  );
  return (
    <tr onClick={e => props.onRowClick(e, props.name)}>
      <td>
        {/* <Link to='' className='' style={{ color: 'rgb(0,0,0,0.87)' }}> */}
        {props.name}
        {/* </Link> */}
      </td>
      <td>{props.modified}</td>
      <td>{props.size}</td>
      <td className='center'>
        <button className='material-icons-outlined btn-flat' onClick={e => props.onClick(e, props.name)}>
          delete
        </button>
        <Modal
          options={{ onOpenStart: props.onChange }}
          header='Rename File'
          trigger={triggerBtn}
          actions={
            <>
              <button
                className='btn-flat waves-light waves-effect'
                onClick={e => props.onClick(e, props.name)}
                id='do-rename'>
                Rename
              </button>
              <button className='btn-flat modal-close waves-light waves-effect'>Close</button>
            </>
          }>
          <div style={{ padding: '10px 0px' }}>
            <div className='input-field'>
              <i className='material-icons prefix'>file_copy</i>
              <input id='fileName' type='text' onChange={props.onChange} />
              <label htmlFor='fileName'>Rename {props.name}</label>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
}

export default ListUserFiles;
