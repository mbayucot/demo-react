import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { UPDATE_USER, GET_USER_PROFILE } from '@demo/shared';
import ProfileForm, { FormValues, validationSchema } from './ProfileForm';

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER);

  const EnhancedProfileForm = withFormik<FormValues, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await updateUser({
        variables: {
          attributes: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
    },
  })(ProfileForm);

  return (
    <Container>
      <Box>
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        {loading ? <CircularProgress /> : data && <EnhancedProfileForm {...data.user} />}
      </Box>
    </Container>
  );
};

export default ProfilePage;
