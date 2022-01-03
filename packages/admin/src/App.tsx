import React, { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import AppRoutes from './routes/AppRoutes';
import { ErrorFallbackPage } from '@demo/shared';

const App = (): ReactElement => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackPage}
      onReset={() => {
        window.location.reload();
      }}
    >
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
