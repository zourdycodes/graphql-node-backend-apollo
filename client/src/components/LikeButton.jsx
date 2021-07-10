import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useState, useEffect } from "react";

import * as ROUTES from "../constants/routes";

export const LikeButton = ({ post: { likeCount, id, likes }, user }) => {
  const [liked, setLiked] = useState(false);
  // const likePost = () => {
  //   console.log("liked");
  // };

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    // if the user has been like the post
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked((liked) => !liked);
    } else setLiked(false);
  }, [likes, user]);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to={ROUTES.LOGIN} color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
