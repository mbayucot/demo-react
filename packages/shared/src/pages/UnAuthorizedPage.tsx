import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const UnAuthorizedPage: FC = () => {
  return (
    <div>
      <h1>Authorization Required!</h1>
      <p>Sorry, your request cannot be processed.</p>
      <NavLink to="/">Back to Home</NavLink>
    </div>
  );
};

export default UnAuthorizedPage;
