import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const NoMatchPage: FC = () => {
  return (
    <div>
      <h1>Oops! That page can’t be found.</h1>
      <p>It looks like nothing was found at this location.</p>
      <NavLink to="/">Back to Home</NavLink>
    </div>
  );
};

export default NoMatchPage;
