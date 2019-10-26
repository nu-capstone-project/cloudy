import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Upload from '../layout/Upload';
import { Modal } from 'react-materialize';

class Dashboard extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <UploadModal />
          </div>
        </div>
      </div>
    );
  }
}

function UploadModal() {
  return (
    <Modal
      header='Select files to Upload'
      trigger={
        <button className='btn waves-effect waves-light hoverable blue accent-3'>
          <i class='material-icons' style={{ fontSize: 18, verticalAlign: 'middle' }}>
            cloud_upload
          </i>
          <span style={{ paddingLeft: 8, verticalAlign: 'middle' }}>Upload</span>
        </button>
      }
      actions={<button className='btn-flat modal-close waves-light waves-effect'>Close</button>}
      open='true'>
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
