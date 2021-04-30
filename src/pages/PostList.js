import React from "react";

import Post from "../components/Post";
const PostList = (props) => {
  const postList = props.postList;
  console.log(postList);

  return (
    <React.Fragment>
      {postList.map((post) => (
        <Post {...post} />
      ))}
    </React.Fragment>
  );
};

export default PostList;
