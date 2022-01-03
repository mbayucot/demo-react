import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { GET_USER, GET_USERS, UPDATE_USER } from '@demo/shared';
import UserForm, { UserFormValues, validationSchema } from './UserForm';

type Params = {
  id: string;
};

const EditUserPage: FC = () => {
  let history = useHistory();
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const EnhancedUserForm = withFormik<UserFormValues, UserFormValues>({
    mapPropsToValues: (props) => ({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
      role: props.role,
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: UserFormValues, { props, ...actions }) => {
      await updateUser({
        variables: {
          id: id,
          attributes: {
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
          },
        },
      });
      history.push('/users');
    },
  })(UserForm);

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          Edit User
        </Typography>
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        {loading ? <CircularProgress /> : data && <EnhancedUserForm {...data.user} />}
      </Box>
    </Container>
  );
};

export default EditUserPage;
