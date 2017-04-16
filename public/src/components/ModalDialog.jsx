import React, {Component} from 'react';
import ReactModal from 'react-modal';

//Define custom styles for Modal dialog
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

/*<div>
  <div className="pull-right" onClick={this.onClose}>
    <span className="glyphicon glyphicon-remove-sign"></span>
  </div>
</div>*/

class ModalDialog extends Component {
  //Render dialog
  render() {
    return (
      <div>
        <ReactModal
          className="upload-dialog"
          isOpen={this.props.show}
          contentLabel="React Modal">

          {this.props.children}
        </ReactModal>
      </div>
    );
  }

  onClose = () => {
    this.props.onModalClose();
  }
}

//Define propTypes to make inputs compulsory
ModalDialog.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onModalClose: React.PropTypes.func.isRequired
};

//Module Export definitions
export default ModalDialog;
