import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { SearchBar } from '@demo/shared';

interface QuickSearchToolbarProps {
  onSubmit: (query: string) => void;
}

const UserListToolbar: FC<QuickSearchToolbarProps> = ({ onSubmit }) => {
  let history = useHistory();

  const handleSubmit = (query: string) => {
    onSubmit(query);
  };

  const onAddNewClick = () => {
    history.push('/users/new');
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
      <div>
        <Button variant="contained" onClick={onAddNewClick}>
          New User
        </Button>
      </div>
      <div>
        <SearchBar onSubmit={handleSubmit} />
      </div>
    </GridToolbarContainer>
  );
};
export default UserListToolbar;
