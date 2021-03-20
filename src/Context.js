import React, { Component, createContext } from "react";

import axios from "axios";
export const Context = createContext();

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      likedPosts: [],
      dislikedPosts: [],
    };

    this.editPost = this.editPost.bind(this);
    this.createPost = this.createPost.bind(this);
  }
  isLiked = (id) => {
    const check =
      this.state.likedPosts.filter((post) => post.id === id).length > 0
        ? true
        : false;
    return check;
  };
  deletePost = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (this.isLiked(id)) {
      this.setState({
        ...this.state,
        likedPosts: this.state.likedPosts.filter((post) => post.id !== id),
      });
    } else if (this.isDisliked(id)) {
      this.setState({
        ...this.state,
        dislikedPosts: this.state.dislikedPosts.filter(
          (post) => post.id !== id
        ),
      });
    }
    this.setState({
      ...this.state,
      posts: this.state.posts.filter((post) => post.id !== id),
    });
  };
  isDisliked = (id) => {
    const check =
      this.state.dislikedPosts.filter((post) => post.id === id).length > 0
        ? true
        : false;
    return check;
  };
  onLikeClick = async (id) => {
    const checkDupli =
      this.state.likedPosts.filter((post) => post.id === id).length > 0
        ? true
        : false;
    const clickedPost = this.state.posts.filter((post) => post.id === id);
    if (checkDupli) {
      this.setState(
        {
          ...this.state,
          likedPosts: this.state.likedPosts.filter((post) => post.id !== id),
        },
        () => {
          console.log(this.state.likedPosts);
        }
      );
    } else if (this.isDisliked(id)) {
      this.setState(
        {
          ...this.state,
          dislikedPosts: this.state.dislikedPosts.filter(
            (post) => post.id !== id
          ),
          likedPosts: [...this.state.likedPosts, clickedPost[0]],
        },
        () => {
          console.log(this.state.likedPosts);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          likedPosts: [...this.state.likedPosts, clickedPost[0]],
        },
        () => {
          console.log(this.state.likedPosts);
        }
      );
    }
  };
  onDislikeClick = (id) => {
    const checkDupli =
      this.state.dislikedPosts.filter((post) => post.id === id).length > 0
        ? true
        : false;
    const clickedPost = this.state.posts.filter((post) => post.id === id);
    if (checkDupli) {
      this.setState(
        {
          ...this.state,
          dislikedPosts: this.state.dislikedPosts.filter(
            (post) => post.id !== id
          ),
        },
        () => {
          console.log(this.state.dislikedPosts);
        }
      );
    } else if (this.isLiked(id)) {
      this.setState(
        {
          ...this.state,
          likedPosts: this.state.likedPosts.filter((post) => post.id !== id),
          dislikedPosts: [...this.state.dislikedPosts, clickedPost[0]],
        },
        () => {
          console.log(this.state.likedPosts);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          dislikedPosts: [...this.state.dislikedPosts, clickedPost[0]],
        },
        () => {
          console.log(this.state.dislikedPosts);
        }
      );
    }
  };
  editPost(id, title, body, userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let tempPosts = this.state.posts;
        for (let i = 0; i < tempPosts.length; i++) {
          if (tempPosts[i].id === json.id) tempPosts[i] = json;
        }
        this.setState(
          {
            ...this.state,
            posts: tempPosts,
          },
          () => {
            console.log(this.state.posts);
          }
        );
      });
  }
  createPost(title, body) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) =>
        this.setState({ ...this.state, posts: [...this.state.posts, json] })
      );
  }
  componentDidMount() {
    const res = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.setState({ posts: result.data });
    };
    res();
  }
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onLikeClick: this.onLikeClick,
          onDislikeClick: this.onDislikeClick,
          deletePost: this.deletePost,
          editPost: this.editPost,
          createPost: this.createPost,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
