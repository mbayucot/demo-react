import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { SearchBar } from '@demo/shared';

interface PostListToolbarProps {
  onSubmit: (query: string) => void;
}

const PostListToolbar: FC<PostListToolbarProps> = ({ onSubmit }) => {
  let history = useHistory();

  const handleSubmit = (query: string) => {
    onSubmit(query);
  };

  const onAddNewClick = () => {
    history.push('/posts/new');
  };

  return (
    <GridToolbarContainer
      style={{
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <Button variant="contained" onClick={onAddNewClick}>
          New Post
        </Button>
      </Box>
      <Box>
        <SearchBar onSubmit={handleSubmit} />
      </Box>
    </GridToolbarContainer>
  );
};

export default PostListToolbar;
