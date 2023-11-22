'use client';


import { Stack } from '@mui/system';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import Image from 'src/components/image';
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

      {cartItems.length!==0?<Grid container spacing={{ xs: 5, md: 8 }}>
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
      </Grid>:<Stack alignItems="center"
          justifyContent="center"
          sx={{ typography: 'h6', display: 'flex' }}>
            <Image src="/assets/images/empty-state/empty-cart.png"/>
        </Stack>
        }

      <Button
        component={RouterLink}
        href={paths.eCommerce.products}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 5 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
