import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { updateCurrentUser } from "../../actions/authActions";

class UploadAvatar extends Component {
  state = {
    selectedFile: "",
    imagePreviewUrl: "",
    uploaded: false,
    error: {}
  };

  fileSelected = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0] || null;

    reader.onloadend = () => {
      this.setState({ selectedFile: file, imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  };

  fileUpload = e => {
    e.preventDefault();
    if (this.state.selectedFile) {
      const fd = new FormData();
      fd.append(
        "avatar",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post("/api/users/upload", fd).then(res => {
        if (res.data.status) {
          this.setState({ uploaded: true, error: "" });
          this.props.updateCurrentUser(res.data.avatar);
        } else {
          this.setState({ error: res.data });
          this.props.updateCurrentUser(res.data.avatar);
        }
      });
    }
  };

  render() {
    const { error } = this.state;
    let alertDiv;
    if (error.status === false) {
      alertDiv = (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      );
    }
    return (
      <div className="avatar text-center my-3">
        <div className="avatar-upload">
          <div className="avatar-edit">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={this.fileSelected}
            />
            <label htmlFor="imageUpload"></label>
          </div>
          <div className="avatar-preview">
            <div
              id="imagePreview"
              style={{
                backgroundImage: `url(${
                  this.state.imagePreviewUrl
                    ? this.state.imagePreviewUrl
                    : this.props.avatar
                })`
              }}
            ></div>
          </div>
        </div>
        <div className="mb-2">
          <small className="text-muted">
            Only JPG, JPEG, PNG accepted. <br />
            Max file size: 1MB{" "}
          </small>
        </div>
        {alertDiv}
        {this.state.uploaded ? (
          <button
            className="btn btn-success"
            onClick={this.fileUpload}
            disabled
          >
            Uploaded
          </button>
        ) : (
          <button className="btn btn-primary" onClick={this.fileUpload}>
            Upload <i className="fas fa-arrow-circle-up"></i>
          </button>
        )}
      </div>
    );
  }
}

UploadAvatar.propTypes = {
  avatar: PropTypes.string.isRequired
};

export default connect(null, { updateCurrentUser })(UploadAvatar);
