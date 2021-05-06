import React from "react";
import styled from "styled-components";

import Post from "../components/Post";
const PostList = (props) => {
  const postList = props.postList;

  return (
    <React.Fragment>
      <PostListC>
        {postList?.map((post, idx) => (
          <Post {...post} key={idx} />
        ))}
      </PostListC>
    </React.Fragment>
  );
};

const PostListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default PostList;
