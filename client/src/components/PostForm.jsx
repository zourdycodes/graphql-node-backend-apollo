import { Form, Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";

export const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY, // get the cache posts data (inside getPosts data cache)
      });
      data.getPosts = [result.data.getPost, ...data.getPosts];
      // PERSIST THE FETCHING PROCESS
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h1>Hello</h1>
        <Form.Field>
          <Form.Input
            placeholder="What's going on?"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button color="teal" type="submit">
            <Icon name="paper plane" color="white" /> Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors?.[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};
