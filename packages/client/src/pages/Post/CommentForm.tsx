import React, { ChangeEvent, FC, KeyboardEvent, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Comment, CREATE_COMMENT } from '@demo/shared';

interface CommentFormProps {
  parentId?: string;
  postId?: number;
  onSuccess: (result: Comment) => void;
}

const CommentForm: FC<CommentFormProps> = ({ postId, parentId, onSuccess }) => {
  const [commentText, setCommentText] = useState<string>('');
  const [createComment, { data, loading, error: mutationError }] = useMutation(CREATE_COMMENT);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value);
  };

  const handleSubmit = useCallback(
    async (value: string) => {
      await createComment({
        variables: {
          postId: postId,
          body: value,
          parentId: parentId || null,
        },
      });
      if (!loading && data) {
        onSuccess(data.comment);
      }
      setCommentText('');
    },
    [postId, parentId],
  );

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSubmit(e.currentTarget.value);
    }
  };

  return (
    <Box data-testid="post-comment-form">
      <TextField
        placeholder="Write a comment..."
        value={commentText}
        onChange={setSearch}
        onKeyPress={handleKeyPress}
      />
      {mutationError && <Alert severity="error">${mutationError.message}</Alert>}
    </Box>
  );
};

export default CommentForm;
