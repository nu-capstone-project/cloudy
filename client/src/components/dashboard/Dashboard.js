import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Upload from '../layout/Upload';
import ListUserFiles from '../layout/ListUserFiles';
import { Modal } from 'react-materialize';

class Dashboard extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <UploadModalButton />
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <ListUserFiles />
          </div>
        </div>
      </div>
    );
  }
}

function UploadModalButton() {
  const triggerBtn = (
    <button className='btn-large waves-effect waves-light blue accent-3'>
      <i className='material-icons' style={{ fontSize: 18, verticalAlign: 'top' }}>
        cloud_upload
      </i>
      <span style={{ paddingLeft: 8, verticalAlign: 'top' }}>Upload</span>
    </button>
  );
  return (
    <Modal
      header='Select files to Upload'
      trigger={triggerBtn}
      actions={<button className='btn-flat modal-close waves-light waves-effect'>Close</button>}
      // open={true}
    >
      <Upload />
    </Modal>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Dashboard);
