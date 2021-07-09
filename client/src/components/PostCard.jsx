import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const likePost = () => {
    console.log("liked");
  };

  const commentPost = () => {
    console.log("comment");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};