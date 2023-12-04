import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({products, data, sx }) {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={5}
      sx={{
        height: 1,
        ...sx,
      }}
    >
      {data.map((link) => (
        <NavList products={products} key={link.title} item={link} />
      ))}
    </Stack>
  );
}

NavDesktop.propTypes = {
  products:PropTypes.array,
  data: PropTypes.array,
  sx: PropTypes.object,
};
