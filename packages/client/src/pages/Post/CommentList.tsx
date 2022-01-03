import { FC, useState } from 'react';
import Container from '@mui/material/Container';

import { Comment } from '@demo/shared';
import CommentListItem from './CommentListItem';
import CommentForm from './CommentForm';

export interface Comments {
  postId?: number;
  children: Comment[];
}

const CommentList: FC<Comments> = ({ postId, children }) => {
  const [items, setItems] = useState<Comment[]>(children);

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <Container data-testid="post-comments">
      {items.map((row: Comment) => (
        <CommentListItem {...row} postId={row.postId} key={row.id} />
      ))}
      <CommentForm postId={postId} onSuccess={handleSuccess} />
    </Container>
  );
};

export default CommentList;
