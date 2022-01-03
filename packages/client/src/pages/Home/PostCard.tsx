import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Post } from '@demo/shared';

import TagList from '../Post/TagList';

const PostCard: FC<Post> = ({ title, body, slug, tags }) => {
  return (
    <Card data-testid="post-card">
      <CardContent>
        <Link to={`/post/${slug}`} data-testid="post-card-link">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {body}
        </Typography>
        {tags && <TagList tags={tags} />}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default PostCard;
