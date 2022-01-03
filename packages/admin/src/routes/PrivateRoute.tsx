import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import Layout from '../layouts/private/Layout';
import { RootState } from '../app/store';
import { AbilityContext } from '../app/casl';
import { Subjects } from '../app/casl/ability';

interface RouterProps extends RouteProps {
  title?: string;
  subject?: Subjects;
}

const PrivateRoute = ({ children, title, subject, ...rest }: RouterProps): React.ReactElement => {
  const isAuthenticated =
    useSelector((state: RootState) => state.authentication.isAuthenticated) && Cookies.get('token');
  const ability = useContext(AbilityContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          [
            !subject || ability.can('read', subject) ? (
              <React.Fragment key={subject}>
                <Helmet title={title} />
                <Layout>{children}</Layout>
              </React.Fragment>
            ) : (
              <Redirect
                to={{
                  pathname: '/unauthorized',
                  state: { from: location },
                }}
              />
            ),
          ]
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
