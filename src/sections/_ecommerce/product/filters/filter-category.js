import PropTypes from 'prop-types';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function FilterCategory({
  options,
  filterCategories,
  onChangeCategories,
  ...other
}) {
  console.log('pr:', filterCategories);
  return (
    <Stack spacing={1} alignItems="flex-start" {...other}>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              size="small"
              value={option}
              checked={filterCategories?.includes(option)}
              onChange={() => onChangeCategories(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
}

FilterCategory.propTypes = {
  filterCategories: PropTypes.array,
  onChangeCategories: PropTypes.func,
  options: PropTypes.array,
};
