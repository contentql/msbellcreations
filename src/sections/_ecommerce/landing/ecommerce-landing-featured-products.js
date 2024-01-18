import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import ProductPrice from '../common/product-price';
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
        <Box gap={3} display="flex" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
          {Featuredproducts?.slice(6).map((product) => (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: { xs: '150px', sm: '330px', md: '220px', lg: '170px' },
                margin: '0',
              }}
            >
              <Link
                component={RouterLink}
                href={`${paths.eCommerce.products}/${product.id}`}
                color="inherit"
                underline="none"
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    transition: (theme) =>
                      theme.transitions.create('background-color', {
                        easing: theme.transitions.easing.easeIn,
                        duration: theme.transitions.duration.shortest,
                      }),
                    '&:hover': {
                      bgcolor: 'background.neutral',
                    },
                  }}
                >
                  <Image
                    src={product.coverUrl.url}
                    sx={{
                      mb: 2,
                      borderRadius: 1.5,
                      bgcolor: 'background.neutral',
                    }}
                  />

                  <Stack spacing={0.5}>
                    <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
                      {product.name}
                    </TextMaxLine>

                    <ProductPrice price={product.price} />
                  </Stack>
                </Paper>
              </Link>
            </Stack>
          ))}
        </Box>
      </Grid>
    </Container>
  );
}

EcommerceLandingFeaturedProducts.propTypes = {
  Featuredproducts: PropTypes.array,
};
