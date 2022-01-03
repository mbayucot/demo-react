import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import { Can } from '../../app/casl';

const ListItems = () => {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push('/posts')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
      <Can I="read" a="User">
        <ListItem button onClick={() => history.push('/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Can>
    </div>
  );
};

export default ListItems;
