'use client';

import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { paths } from 'src/routes/paths';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import EcommerceCartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function EcommerceWishlistView() {
  const { wishItems} = useWish()
  const [subtotal,setSub]=useState(0)
  useEffect(()=>{
    setSub(st=>wishItems.reduce((acc, item) => acc + item.price*item.quantity, 0))
  },[wishItems])
  
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Wishlist
      </Typography>

      <EcommerceCartList wishlist={ true||false } products={ wishItems} />

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent={{ sm: 'space-between' }}
        sx={{ mt: 3 }}
      >
        <Button
          component={RouterLink}
          href={paths.eCommerce.product}
          color="inherit"
          startIcon={<Iconify icon="carbon:chevron-left" />}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>

        <Stack spacing={3} sx={{ minWidth: 240 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'h6' }}
          >
            <Box component="span"> Subtotal</Box>
           <>{subtotal.toFixed(2)}</>
          </Stack>

          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
