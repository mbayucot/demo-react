import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Helmet from 'react-helmet';

interface RouterProps extends RouteProps {
  title: string;
}

const PublicRoute = ({ children, title, ...rest }: RouterProps): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Helmet title={title} />
          <div>{children}</div>
        </>
      )}
    />
  );
};

export default PublicRoute;
