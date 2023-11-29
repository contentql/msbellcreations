'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { useCart } from 'src/app/store';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import EcommerceCartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function EcommerceWishlistView() {
  const { wishItems, wishdeleteProduct } = useWish();
  const { cartItems, updateQuantity, addProduct } = useCart();
  const [subtotal, setSub] = useState(0);
  useEffect(() => {
    setSub((st) => wishItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [wishItems]);

  const Addtocart = () => {
    if (wishItems.length !== 0) {
      wishItems.forEach((wishlistItem) => {
        const existingProductInCart = cartItems.find((item) => item.id === wishlistItem.id);

        if (existingProductInCart) {
          updateQuantity(
            existingProductInCart.id,
            existingProductInCart.quantity + wishlistItem.quantity
          );
        } else {
          addProduct({ ...wishlistItem });
          updateQuantity(wishlistItem.id, wishlistItem.quantity);
        }
      });

      wishItems.forEach((wishlistItem) => {
        wishdeleteProduct(wishlistItem.id);
      });
    } else {
      toast.error('Your wishlist is empty.Redirected to products page');
    }
  };

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 3 }}>
        Wishlist
      </Typography>

      {wishItems.length === 0 && (
        <Stack alignItems="center" justifyContent="center" sx={{ display: 'flex' }}>
          <Typography
            variant="body2"
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ typography: 'h6', display: 'flex' }}
          >
            <Image src="/assets/images/empty-state/empty-wishlist.png" />
          </Typography>
          <Link href={paths.eCommerce.products} sx={{ typography: 'h6', mt: 10 }}>
            Go to products page
          </Link>
        </Stack>
      )}
      <EcommerceCartList wishlist={true || false} products={wishItems} />

      {wishItems.length !== 0 ? (
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'space-between' }}
          sx={{ mt: 3 }}
        >
          <Button
            component={RouterLink}
            href={paths.eCommerce.products}
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
              href={wishItems.length ? paths.eCommerce.cart : paths.eCommerce.products}
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
              onClick={Addtocart}
            >
              {wishItems.length !== 0 ? 'Add to Cart' : 'Go to Products'}
            </Button>
          </Stack>
        </Stack>
      ) : (
        ''
      )}
    </Container>
  );
}
