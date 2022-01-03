import React, { useState, FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import { CREATE_SUBSCRIPTION } from '@demo/shared';
import CardSection from './CardSection';

type StripeToken = {
  id: number | string;
};

const CheckoutForm = () => {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [createSubscription, { loading, error: mutationError }] = useMutation(CREATE_SUBSCRIPTION);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      setError(result.error.message);
    } else {
      await stripeTokenHandler(result.token);
    }
  };

  const stripeTokenHandler = async (token: StripeToken) => {
    await createSubscription({
      variables: {
        token: token.id,
      },
    });
    history.push('/posts');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">${error}</Alert>}
      {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
      <CardSection />
      <LoadingButton
        disabled={!stripe}
        type="submit"
        loading={loading}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Confirm Order
      </LoadingButton>
    </form>
  );
};

export default CheckoutForm;
