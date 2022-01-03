import React, { FC, useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { useFeature } from 'flagged';
import { useSelector } from 'react-redux';
import { FacebookSelector } from '@charkour/react-reactions';
import Cookies from 'js-cookie';
import debounce from 'debounce';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { GET_POST_DETAIL, VOTE_POST, PostReactions, Reaction, voteWeights } from '@demo/shared';

import CommentList from './CommentList';
import { RootState } from '../../app/store';

type Params = {
  slug: string;
};

const PostDetailPage: FC = () => {
  let { slug } = useParams<Params>();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [reactionController, setReactionController] = useState<{ toggler: boolean; reaction: Reaction }>({
    toggler: false,
    reaction: 'thumb',
  });

  const hasSubscription = useFeature('subscription');
  const authState = useSelector((state: RootState) => state);

  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: slug },
  });

  const [votePost] = useMutation(VOTE_POST);

  const handleLikeClick = useCallback(async () => {
    setReactionController({
      toggler: false,
      reaction: 'thumb',
    });

    await votePost({
      variables: {
        id: slug,
        weight: 0,
      },
    });
  }, [slug, votePost]);

  const handleReaction = useCallback(
    async (label: string) => {
      setReactionController({
        toggler: false,
        reaction: label as Reaction,
      });

      await votePost({
        variables: {
          id: slug,
          weight: voteWeights[reactionController.reaction],
        },
      });
    },
    [slug, reactionController, votePost],
  );

  const handleHideReaction = () =>
    setReactionController((prevValues) => {
      return { ...prevValues, toggler: false };
    });

  const handleShowReaction = () =>
    setReactionController((prevValues) => {
      return { ...prevValues, toggler: true };
    });

  const debouncedChangeHandler = useMemo(() => debounce(handleHideReaction, 1000), []);

  const handleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <Container data-testid="post-detail">
      {error && <Alert severity="error">${error.message}</Alert>}
      {!data && <Alert severity="error">Not found!</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        data && (
          <Card>
            <CardContent data-testid="post-content">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {data.post.title}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {data.post.content}
              </Typography>
            </CardContent>
            {authState.authentication.isAuthenticated && Cookies.get('token') ? (
              <>
                <CardActions data-testid="post-actions">
                  <Box>
                    {showComment && data && <CommentList postId={data.post.id} children={data.post.comments} />}
                  </Box>
                  {reactionController.toggler && (
                    <FacebookSelector onSelect={handleReaction} data-testid="post-reaction-selector" />
                  )}
                  <PostReactions
                    handleShowReaction={handleShowReaction}
                    debouncedChangeHandler={debouncedChangeHandler}
                    handleLikeClick={handleLikeClick}
                    reaction={reactionController.reaction}
                  />
                  <Button onClick={handleComment} data-testid="post-comment-toggle">
                    Comment
                  </Button>
                </CardActions>
                <div>
                  {!hasSubscription && !data.post.subscribed && (
                    <Link to={`/checkout`}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Subscribe to continue reading!
                      </Typography>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to={`/login?from=/posts/${slug}`}>
                  <p>Create your free account or log in to continue reading.</p>
                </Link>
              </>
            )}
          </Card>
        )
      )}
    </Container>
  );
};

export default PostDetailPage;
