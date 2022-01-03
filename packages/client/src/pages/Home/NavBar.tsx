import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { SearchBar } from '@demo/shared';

interface NavBarProps {
  onSearch: (query: string) => void;
}

const NavBar: FC<NavBarProps> = ({ onSearch }) => {
  const handleSubmit = (query: string) => {
    onSearch(query);
  };

  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Demo
          </Typography>
          <SearchBar onSubmit={handleSubmit} />
          <nav>
            <Link component={RouterLink} variant="button" color="text.primary" to={'/login'} sx={{ my: 1, mx: 1.5 }}>
              Sign in
            </Link>
          </nav>
          <Button component={RouterLink} to={'/signup'} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
