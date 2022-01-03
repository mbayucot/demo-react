import React, { FC, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DataGrid, GridActionsCellItem, GridRowId, GridSortModel } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';

import { ConfirmDialog, GET_POSTS, DELETE_POST, Post } from '@demo/shared';
import PostListToolbar from './PostListToolbar';

const PostListPage: FC = () => {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'date', sort: 'asc' }]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [id, setId] = React.useState<GridRowId>();

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page, query, sort: sortModel.length === 0 ? 'asc' : sortModel[0].sort },
  });
  const [destroyPost, { error: mutationError }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const handleConfirmDialog = async () => {
    setOpenDialog(false);
    await destroyPost({
      variables: {
        id: id,
      },
    });
  };

  const editPost = useCallback(
    (id: GridRowId) => () => {
      history.push(`/posts/${id}/edit`);
    },
    [history],
  );

  const onDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      setId(id);
      setOpenDialog(true);
    },
    [],
  );

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  const setNewPage = (newPage: number) => {
    setPage(newPage + 1);
  };

  const columns = useMemo(
    () => [
      { field: 'title', headerName: 'Title', width: 150 },
      { field: 'updatedAt', headerName: 'Date', width: 150 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: Post) => [
          <GridActionsCellItem icon={<SecurityIcon />} label="Edit" onClick={editPost(params.id)} showInMenu />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick(params.id)} showInMenu />,
        ],
      },
    ],
    [editPost, destroyPost, onDeleteClick],
  );

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundColor: '#fff',
        }}
      >
        {error && <Alert severity="error">${error.message}</Alert>}
        {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
        <DataGrid
          autoHeight
          rows={(data && data.posts.collection) || []}
          columns={columns}
          loading={loading}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          page={page}
          onPageChange={(newPage) => setNewPage(newPage)}
          pagination
          pageSize={10}
          rowCount={(data && data.posts.metadata.totalCount) || 0}
          paginationMode="server"
          rowsPerPageOptions={[10]}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          components={{
            Toolbar: PostListToolbar,
          }}
          componentsProps={{
            toolbar: {
              onSubmit: (query: string) => requestSearch(query),
            },
          }}
        />
      </Box>
      <ConfirmDialog
        message="Are you sure you want to delete this post?"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default PostListPage;
