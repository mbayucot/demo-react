import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { GET_POST, UPDATE_POST, GET_POSTS } from '@demo/shared';
import PostForm, { FormValues, validationSchema } from './PostForm';

type Params = {
  id: string;
};

const EditPostPage: FC = () => {
  let history = useHistory();
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });

  const [updatePost, { error: mutationError }] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const EnhancedPostForm = withFormik<FormValues, FormValues>({
    mapPropsToValues: (props) => ({
      title: props.title,
      body: props.body,
      tags: props.tags,
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await updatePost({
        variables: {
          id: id,
          attributes: {
            title: values.title,
            body: values.body,
            tagList: values.tagList,
          },
        },
      });
      history.push('/posts');
    },
  })(PostForm);

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          Edit Post
        </Typography>
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        {loading ? <CircularProgress /> : data && <EnhancedPostForm {...data.post} />}
      </Box>
    </Container>
  );
};

export default EditPostPage;
