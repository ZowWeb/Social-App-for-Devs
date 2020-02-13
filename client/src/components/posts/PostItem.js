import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-header bg-transparent border-info">
          <img
            className="rounded-circle"
            src={post.user.avatar || post.avatar}
            alt=""
            style={{ height: "40px", width: "auto", marginRight: "10px" }}
          />
          <span>{post.name}</span>
        </div>
        <div className="card-body">
          <p className="lead">{post.text}</p>
          {showActions ? (
            <span>
              <button
                onClick={this.onLikeClick.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": this.findUserLike(post.likes)
                  })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user._id === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <Moment fromNow>{post.date}</Moment>
          </small>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
