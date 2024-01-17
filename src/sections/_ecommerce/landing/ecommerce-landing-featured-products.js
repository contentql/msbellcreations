import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';

import EcommerceProductItemHot from '../product/item/ecommerce-product-item-hot';
import EcommerceProductItemCountDown from '../product/item/ecommerce-product-item-count-down';

// ----------------------------------------------------------------------

export default function EcommerceLandingFeaturedProducts({ Featuredproducts }) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Featured Products
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {Featuredproducts?.slice(0, 2).map((product, index) => (
              <EcommerceProductItemCountDown
                key={product.id}
                product={product}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>

        <Grid xs={12} lg={4}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
          >
            {Featuredproducts?.slice(2, 6).map((product) => (
              <EcommerceProductItemHot key={product.id} product={product} />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12} lg={5} sx={{ pt: 3 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
        >
          {Featuredproducts?.slice(6).map((product) => (
            <EcommerceProductItemHot key={product.id} product={product} />
          ))}
        </Box>
      </Grid>
    </Container>
  );
}

EcommerceLandingFeaturedProducts.propTypes = {
  Featuredproducts: PropTypes.array,
};
