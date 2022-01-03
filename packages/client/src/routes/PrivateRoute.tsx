import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

import Layout from '../layouts/private/Layout';
import { RootState } from '../app/store';

interface RouterProps extends RouteProps {
  title?: string;
}

const PrivateRoute = ({ children, title, ...rest }: RouterProps): React.ReactElement => {
  const isAuthenticated =
    useSelector((state: RootState) => state.authentication.isAuthenticated) && Cookies.get('token');

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <>
          {isAuthenticated ? (
            <>
              <Helmet title={title} />
              <Layout>{children}</Layout>
            </>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default PrivateRoute;
