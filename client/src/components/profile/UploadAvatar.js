import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class UploadAvatar extends Component {
  state = {
    selectedFile: "",
    imagePreviewUrl: "",
    uploaded: false
  };

  fileSelected = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ selectedFile: file, imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  };

  fileUpload = () => {
    const fd = new FormData();
    fd.append("avatar", this.state.selectedFile, this.state.selectedFile.name);
    axios.post("/api/users/upload", fd).then(this.setState({ uploaded: true }));
  };

  render() {
    let $imagePreview = "";
    this.state.imagePreviewUrl
      ? ($imagePreview = (
          <img src={this.state.imagePreviewUrl} className="rounded-circle" />
        ))
      : ($imagePreview = (
          <img src={this.props.avatar} className="rounded-circle" />
        ));
    return (
      <div className="avatar row my-3">
        <div className="col-4 mx-auto">{$imagePreview}</div>
        <div className="col-12 mt-3">
          {this.state.uploaded ? (
            <small className="text-success">Image uploaded successfully</small>
          ) : (
            <small className="text-muted">Recommended dimensions 300x300</small>
          )}
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="uploadavatar"
                onChange={this.fileSelected}
              />
              <label
                className="custom-file-label text-overflow"
                htmlFor="uploadavatar"
              >
                Choose file
              </label>
            </div>
            <div className="input-group-append">
              <button className="input-group-text" onClick={this.fileUpload}>
                <i className="fas fa-arrow-circle-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UploadAvatar.propTypes = {
  avatar: PropTypes.string.isRequired
};

export default UploadAvatar;
