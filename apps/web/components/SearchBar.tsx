'use client';
import { Button, Paper, InputBase, Divider } from '@mui/material';

interface Props {
  searchString: string;
  onChange: (args: string) => void;
  onSearchClick: () => void;
}

const SearchBar = ({ searchString, onChange, onSearchClick }: Props) => {
  return (
    <Paper
      component="form"
      elevation={3}
      sx={{ p: '2px 4px', my: 3, display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchString}
        placeholder="Start Search Product"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={() => onSearchClick()}
      >
        Search
      </Button>
    </Paper>
  );
};

export default SearchBar;
