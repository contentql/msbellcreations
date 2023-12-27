import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function EcommerceProductItemHero({ products, current }) {
  const theme = useTheme();

  const product = products[current];

  return (
    <Grid
      container
      rowSpacing={{
        xs: 5,
        md: 0,
      }}
      sx={{
        pt: 12,
        pb: 10,
        px: { xs: 3, md: 10 },
        backgroundColor: `${product.bgColor}`,
      }}
    >
      <Grid xs={12} md={6}>
        <Box
          sx={{
            maxWidth: { md: 440 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            {product.label || 'In Stock'}
          </Label>

          <TextMaxLine variant="h3" sx={{ mb: 2 }}>
            {product.name}
          </TextMaxLine>

          <TextMaxLine line="3" variant="body2" sx={{ mb: 5, color: 'text.secondary' }}>
            {product.caption}
          </TextMaxLine>

          <Button
            component={RouterLink}
            href={`${paths.eCommerce.products}/${product.id}`}
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Shop Now
          </Button>
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Image
          src={product.coverUrl.url}
          sx={{
            filter: `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`,
            maxWidth: 400,
            ml: 'auto',
            mr: { xs: 'auto', md: 'unset' },
          }}
        />
      </Grid>
    </Grid>
  );
}

EcommerceProductItemHero.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      caption: PropTypes.string,
      coverUrl: PropTypes.object,
      label: PropTypes.string,
      title: PropTypes.string,
      bgColor: PropTypes.string,
    })
  ),
  current: PropTypes.number,
};
