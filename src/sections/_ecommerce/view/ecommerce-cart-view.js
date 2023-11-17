'use client';


import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import {useCart} from "../../../app/store";
import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const {cartItems}=useCart();
  const subtotal = () => cartItems.reduce((acc, product) => 
  acc + product.quantity * product.price
, 0);

  
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8}>
          <EcommerceCartList products={cartItems} />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceCartSummary
            tax={7}
            total={357.09}
            subtotal={subtotal()}
            shipping={55.47}
            discount={16.17}
          />
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={paths.eCommerce.products}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
