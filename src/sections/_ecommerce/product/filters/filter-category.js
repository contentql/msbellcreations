import PropTypes from 'prop-types';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';

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
  return (
    <Stack spacing={1} alignItems="flex-start" {...other}>
      {options.map((option) => (
        <Link component={RouterLink} href={`${paths.eCommerce.products}/?category=${option}`}>
          <Stack
            key={option}
            direction="row"
            alignItems="center"
            onClick={() => onChangeCategories(option)}
            sx={{
              typography: 'body2',
              cursor: 'pointer',
              ...(filterCategories === option && {
                fontWeight: 'fontWeightBold',
              }),
            }}
          >
            <Iconify icon="carbon:chevron-right" width={12} sx={{ mr: 1 }} />
            {option}
          </Stack>
        </Link>
      ))}
    </Stack>
  );
}

FilterCategory.propTypes = {
  filterCategories: PropTypes.string,
  onChangeCategories: PropTypes.func,
  options: PropTypes.array,
};
