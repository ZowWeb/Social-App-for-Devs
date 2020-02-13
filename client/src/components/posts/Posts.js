import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts, getMorePosts } from "../../actions/postActions";

class Posts extends Component {
  state = {
    newPosts: []
  };

  componentDidMount() {
    this.props.getPosts();
  }

  getMorePostsBtn(e) {
    e.preventDefault();
    let nextThree = 3;

    this.props.getMorePosts(nextThree);
  }

  render() {
    const { posts, loading, newposts } = this.props.post;
    // const { newPosts } = this.state;
    let postContent, newPostContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    if (newposts === null || loading) {
      newPostContent = <Spinner />;
    } else {
      newPostContent = <PostFeed posts={newposts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
              {newPostContent}
              <button
                className="btn btn-secondary btn-block mt-4"
                onClick={this.getMorePostsBtn.bind(this)}
              >
                Get More Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts, getMorePosts })(Posts);
