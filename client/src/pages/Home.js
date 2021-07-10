import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import { useContext } from "react";

import { AuthContext } from "../utils/context/auth";
import { PostCard } from "../components/PostCard";
import "../App.css";
import { PostForm } from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

export const Home = () => {
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getPosts },
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={2} divided stackable>
      <Grid.Row className="page-title">
        <h1 className="heading">Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="distance">
        {user && (
          <Grid.Column
            style={{
              marginBottom: "50px",
            }}
          >
            <PostForm />
          </Grid.Column>
        )}

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
