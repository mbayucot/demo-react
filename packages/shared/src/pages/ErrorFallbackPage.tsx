import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import Helmet from 'react-helmet';

const ErrorFallbackPage: FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <>
      <Helmet title="Error" />
      <div>
        <h1>Something went wrong</h1>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </>
  );
};

export default ErrorFallbackPage;
