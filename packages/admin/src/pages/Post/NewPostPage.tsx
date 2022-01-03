import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CREATE_POST, GET_POSTS } from '@demo/shared';
import PostForm, { FormValues, validationSchema } from './PostForm';

const NewPostPage: FC = () => {
  let history = useHistory();
  const [createPost, { error: mutationError }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const EnhancedPostForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      title: '',
      body: '',
      tags: [],
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await createPost({
        variables: {
          title: values.title,
          body: values.body,
          tagList: values.tagList,
        },
      });
      history.push('/posts');
    },
  })(PostForm);

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        {mutationError && <Alert severity="error">${mutationError?.message}</Alert>}
        <EnhancedPostForm />
      </Box>
    </Container>
  );
};

export default NewPostPage;
