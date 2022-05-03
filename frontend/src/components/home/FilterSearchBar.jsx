import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

function FilterSearchBar({ searchKeyword, setSearchKeyword }) {
  const [period, setPeriod] = useState(0);
  const [day, setDay] = useState(0);

  function handlePeriodChange(e) {
    setPeriod(e.target.value);
  }

  function handleDayChange(e) {
    setDay(e.target.value);
  }

  function onSearchKeyUp(e) {
    if (e.keyCode === 13 && searchKeyword.length > 0) {
      console.log('ok');
    }
  }

  function handleKeywordChange(e) {
    setSearchKeyword(e.target.value);
  }

  return (
    <>
      <FormControl sx={{ width: 100, margin: '0 0.5rem 0.5rem 0' }}>
        <InputLabel id="period">기간</InputLabel>
        <Select
          labelId="period"
          id="period"
          value={period}
          label="기간"
          displayEmpty
          onChange={event => handlePeriodChange(event)}
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={7}>이번 주</MenuItem>
          <MenuItem value={14}>다음 주</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 80 }}>
        <InputLabel id="day">요일</InputLabel>
        <Select
          labelId="day"
          id="day"
          value={day}
          label="요일"
          displayEmpty
          onChange={event => handleDayChange(event)}
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={1}>일</MenuItem>
          <MenuItem value={2}>월</MenuItem>
          <MenuItem value={3}>화</MenuItem>
          <MenuItem value={4}>수</MenuItem>
          <MenuItem value={5}>목</MenuItem>
          <MenuItem value={6}>금</MenuItem>
          <MenuItem value={7}>토</MenuItem>
        </Select>
      </FormControl>
      <OutlinedInput
        id="restaurant"
        name="restaurant"
        type="text"
        value={searchKeyword}
        onChange={event => handleKeywordChange(event)}
        onKeyUp={event => onSearchKeyUp(event)}
        fullWidth
        margin="dense"
        placeholder="지역/식당 이름/호스트 닉네임"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search keyword',
        }}
      />
    </>
  );
}

FilterSearchBar.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
};
export default FilterSearchBar;
