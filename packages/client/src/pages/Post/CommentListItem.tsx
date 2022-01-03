import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Comment } from '@demo/shared';
import CommentForm from './CommentForm';

const CommentListItem: FC<Comment> = ({ id, postId, body, children }) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [items, setItems] = useState<Comment[]>(children || []);

  const handleReplyClick = () => {
    setShowReply(true);
  };

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <Card>
      <CardContent>
        <Typography>{body}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleReplyClick}>Reply</Button>
        <Box>
          {items && items.map((row: Comment) => <CommentListItem {...row} key={row.id} />)}
          {showReply && <CommentForm postId={postId} parentId={id} onSuccess={handleSuccess} />}
        </Box>
      </CardActions>
    </Card>
  );
};

export default CommentListItem;
