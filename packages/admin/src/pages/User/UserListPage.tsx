import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';

import { User, ConfirmDialog, GET_USERS, DELETE_USER } from '@demo/shared';
import UserListToolbar from './UserListToolbar';

const UserListPage: FC = () => {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<GridRowId>();

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { page, query },
  });
  const [destroyUser, { error: mutationError }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    await onDeleteUser();
  };

  const editUser = useCallback(
    (id: GridRowId) => () => {
      history.push(`/users/${id}/edit`);
    },
    [],
  );

  const onDeleteUser = async () => {
    await destroyUser({
      variables: {
        id: id,
      },
    });
  };

  const onDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      setId(id);
      handleClickOpen();
    },
    [],
  );

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  const setNewPage = (newPage: number) => {
    setPage(newPage + 1);
  };

  const columns = React.useMemo(
    () => [
      { field: 'email', headerName: 'Email' },
      { field: 'name', headerName: 'Name' },
      { field: 'role', headerName: 'Role' },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: User) => [
          <GridActionsCellItem icon={<SecurityIcon />} label="Edit" onClick={editUser(params.id)} showInMenu />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick(params.id)} showInMenu />,
        ],
      },
    ],
    [editUser, destroyUser],
  );

  return (
    <>
      <Box style={{ height: 300, width: '100%' }}>
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        <DataGrid
          rows={(data && data.users.collection) || []}
          columns={columns}
          loading={loading}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          page={page}
          onPageChange={(newPage) => setNewPage(newPage)}
          pagination
          pageSize={10}
          rowCount={(data && data.users.metadata.totalCount) || 0}
          paginationMode="server"
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: UserListToolbar,
          }}
          componentsProps={{
            toolbar: {
              onSubmit: (query: string) => requestSearch(query),
            },
          }}
        />
      </Box>
      <ConfirmDialog
        message="Are you sure you want to delete this user?"
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default UserListPage;
