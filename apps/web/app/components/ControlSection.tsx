'use client';
import {
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useAppStoreCtx } from '../context';
import { SortBy, SortOrder } from '../constants';
const ControlSection = () => {
  const { filter, handleSortBy, handleSortOrder } = useAppStoreCtx();
  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        border: theme => `0px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
      }}
    >
      <Typography mr={1}>Sort By:</Typography>
      <ToggleButtonGroup
        value={filter.sort}
        exclusive
        onChange={handleSortBy}
        aria-label="text alignment"
      >
        {Object.values(SortBy).map(val => (
          <ToggleButton value={val} key={'MenuItem' + val}>
            {val.toLocaleUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <ToggleButtonGroup
        value={filter.order}
        exclusive
        onChange={handleSortOrder}
        aria-label="text alignment"
      >
        <ToggleButton value={SortOrder.ASC} aria-label="left aligned">
          <ArrowDropDown />
        </ToggleButton>
        <ToggleButton value={SortOrder.DESC} aria-label="left aligned">
          <ArrowDropUp />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default ControlSection;
