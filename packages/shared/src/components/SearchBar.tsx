import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

interface Props {
  onSubmit: (query: string) => void;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme },
);

const SearchBar: FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSubmit(searchText);
  };

  const clearSearch = () => {
    setSearchText('');
    onSubmit('');
  };

  return (
    <TextField
      variant="standard"
      value={searchText}
      onChange={setSearch}
      onKeyPress={handleKeyPress}
      placeholder="Search…"
      className={classes.textField}
      inputProps={{ 'data-testid': 'searchfield' }}
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: searchText ? 'visible' : 'hidden' }}
            onClick={clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;
