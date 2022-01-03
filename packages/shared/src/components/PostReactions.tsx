import React, { FC } from 'react';
import Button from '@mui/material/Button';

import icons from './ReactionIcons';

interface Props {
  handleShowReaction: () => void;
  debouncedChangeHandler: () => void;
  handleLikeClick: () => void;
  reaction: string;
}

const PostReactions: FC<Props> = ({ handleShowReaction, debouncedChangeHandler, handleLikeClick, reaction }) => {
  return (
    <Button
      className="mr-4"
      onMouseOver={handleShowReaction}
      onMouseOut={debouncedChangeHandler}
      onClick={handleLikeClick}
      data-testid="post-reactions"
    >
      <img src={icons.find(reaction)} />
    </Button>
  );
};

export default PostReactions;
