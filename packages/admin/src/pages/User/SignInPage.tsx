import React, { FC } from 'react';
import { withFormik } from 'formik';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { RootState } from '../../app/store';
import { login } from '../../features/authentication/authenticationSlice';
import SignInForm, { SignInFormValues, validationSchema } from './SignInForm';

const SignInPage: FC = () => {
  const authState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const location = useLocation<{
    from: { pathname: string };
  }>();
  const { from } = location.state || { from: { pathname: '/posts' } };

  const EnhancedLoginForm = withFormik<{}, SignInFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: SignInFormValues, { props, ...actions }) => {
      dispatch(login({ user: { ...values }, domain: 'author' }));
    },
  })(SignInForm);

  if (authState.authentication.isAuthenticated && Cookies.get('token')) {
    return <Redirect to={from} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to account
        </Typography>
        {authState.authentication.error && <Alert severity="error">${authState.authentication.error}</Alert>}
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
