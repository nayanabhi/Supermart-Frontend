import React from 'react';
import { TextField, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item>
        <SearchIcon />
      </Grid>
      <Grid item style={{justifyContent: 'center'}}>
        <TextField id="search" label="Search" variant="outlined" size="small" sx={{ '& input': { padding: '18px', border:"0px" } }} />
      </Grid>
    </Grid>
  );
};

export default SearchBox;
