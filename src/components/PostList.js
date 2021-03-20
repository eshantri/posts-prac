import React, { useContext, useState } from "react";
import { Context } from "../Context";
import Post from "./Post";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
const PostList = () => {
  const context = useContext(Context);
  const posts = context.posts;
  const likedPosts = context.likedPosts;
  const dislikedPosts = context.dislikedPosts;
  const [sugges, setSugges] = useState([]);
  const handleSearch = (e) => {
    const suggestions = posts.filter((post) => {
      return post.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSugges(suggestions);
  };
  const isLiked = (id) => {
    const check =
      likedPosts.filter((post) => post.id === id).length > 0 ? true : false;
    return check;
  };
  const isDisliked = (id) => {
    const check =
      dislikedPosts.filter((post) => post.id === id).length > 0 ? true : false;
    return check;
  };
  if (!posts.length) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }
  if (!sugges.length) {
    return (
      <React.Fragment>
        <TextField
          id="outlined-basic"
          style={{ width: "60%", margin: "80px 20px 20px" }}
          placeholder="Search for posts"
          variant="outlined"
          onChange={(e) => handleSearch(e)}
          autoComplete="off"
        />
        <div className="container">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.body}
              isLiked={isLiked}
              isDisliked={isDisliked}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <TextField
        id="outlined-basic"
        style={{ width: "60%", margin: "80px 20px 20px" }}
        placeholder="Search for posts"
        variant="outlined"
        onChange={(e) => handleSearch(e)}
        autoComplete="off"
      />
      <div className="container">
        {sugges.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            content={post.body}
            isLiked={isLiked}
            isDisliked={isDisliked}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default PostList;
