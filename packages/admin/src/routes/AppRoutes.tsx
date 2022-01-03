import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AbilityContext, defineAbilityFor } from '../app/casl';
import { RootState } from '../app/store';

import { NoMatchPage, UnAuthorizedPage } from '@demo/shared';

const Login = lazy(() => import('../pages/User/SignInPage'));
const UserList = lazy(() => import('../pages/User/UserListPage'));
const NewUser = lazy(() => import('../pages/User/NewUserPage'));
const EditUser = lazy(() => import('../pages/User/EditUserPage'));
const PostList = lazy(() => import('../pages/Post/PostListPage'));
const NewPost = lazy(() => import('../pages/Post/NewPostPage'));
const EditPost = lazy(() => import('../pages/Post/EditPostPage'));
const Profile = lazy(() => import('../pages/User/ProfilePage'));

const AppRoutes: FC = () => {
  const user = useSelector((state: RootState) => state.authentication.user);
  const ability = defineAbilityFor(user);

  return (
    <AbilityContext.Provider value={ability}>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <PublicRoute exact path="/" title="Login">
            <Login />
          </PublicRoute>

          <PublicRoute exact path="/login" title="Login">
            <Login />
          </PublicRoute>

          <PrivateRoute path="/posts/:id/edit" title="Edit Post" subject="Post">
            <EditPost />
          </PrivateRoute>

          <PrivateRoute path="/posts/new" title="New Post" subject="Post">
            <NewPost />
          </PrivateRoute>

          <PrivateRoute path="/posts" title="Posts" subject="Post">
            <PostList />
          </PrivateRoute>

          <PrivateRoute path="/users/:id/edit" title="Edit User" subject="User">
            <EditUser />
          </PrivateRoute>

          <PrivateRoute path="/users/new" title="New User" subject="User">
            <NewUser />
          </PrivateRoute>

          <PrivateRoute path="/users" title="Users" subject="User">
            <UserList />
          </PrivateRoute>

          <PrivateRoute path="/profile" title="Profile">
            <Profile />
          </PrivateRoute>

          <Route path="/unauthorized">
            <UnAuthorizedPage />
          </Route>

          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </Suspense>
    </AbilityContext.Provider>
  );
};

export default AppRoutes;
