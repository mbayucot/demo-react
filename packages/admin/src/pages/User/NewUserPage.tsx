import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { GET_USERS, CREATE_USER } from '@demo/shared';
import UserForm, { UserFormValues, validationSchema } from './UserForm';

const NewUserPage: FC = () => {
  let history = useHistory();

  const [createUser, { error: mutationError }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const EnhancedUserForm = withFormik<{}, UserFormValues>({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: UserFormValues, { props, ...actions }) => {
      await createUser({
        variables: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          role: values.role,
        },
      });
      history.push('/users');
    },
  })(UserForm);

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          New User
        </Typography>
        {mutationError && <Alert severity="error">${mutationError?.message}</Alert>}
        <EnhancedUserForm />
      </Box>
    </Container>
  );
};

export default NewUserPage;
