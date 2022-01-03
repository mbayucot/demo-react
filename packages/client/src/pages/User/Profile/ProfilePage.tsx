import React, { FC } from 'react';
import { withFormik } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, useMutation } from '@apollo/client';
import { useFeature } from 'flagged';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { UPDATE_USER, GET_USER_PROFILE } from '@demo/shared';
import ProfileForm, { ProfileFormValues, validationSchema } from './ProfileForm';

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER);
  const hasSubscription = useFeature('subscription');
  const stripe = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

  const EnhancedProfileForm = withFormik<ProfileFormValues, ProfileFormValues>({
    mapPropsToValues: (props) => ({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
    }),
    validationSchema: validationSchema,
    handleSubmit: async (values: ProfileFormValues, { props, ...actions }) => {
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

  const handleAccount = async () => {
    const { url } = await stripe?.billingPortal.sessions.create({
      customer: data.user.stripeCustomerId,
      return_url: `${process.env.STRIPE_SECRET_KEY_LIVE}/profile`,
    });
    window.location.href = url;
  };

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        {loading ? <CircularProgress /> : data && <EnhancedProfileForm {...data.user} />}
        {hasSubscription && data.user.stripeCustomerId && <button onClick={handleAccount}>Stripe Portal</button>}
      </Box>
    </Container>
  );
};

export default ProfilePage;
