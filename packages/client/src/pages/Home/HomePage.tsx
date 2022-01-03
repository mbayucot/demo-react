import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import { GET_POSTS, Post } from '@demo/shared';

import NavBar from './NavBar';
import PostCard from './PostCard';

const HomePage: FC = () => {
  let location = useLocation();
  const [query, setQuery] = React.useState('');

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { query, tag: qs.parse(location.search).tag },
  });

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <NavBar onSearch={handleSearch} />
      <Box data-testid="post-cards">
        {error && <Alert severity="error">${error.message}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          data && data.posts.collection.map((row: Post) => <PostCard key={row.id} {...row} />)
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
