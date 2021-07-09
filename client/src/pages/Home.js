import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import { PostCard } from "../components/PostCard";
import "../App.css";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;

export const Home = () => {
  const {
    loading,
    data: { getPosts },
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided stackable>
      <Grid.Row className="page-title">
        <h1 className="heading">Some Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="distance">
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          getPosts &&
          getPosts.map((post) => (
            <Grid.Column
              key={post.id}
              style={{
                marginBottom: "20px",
              }}
              stretched
            >
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};
