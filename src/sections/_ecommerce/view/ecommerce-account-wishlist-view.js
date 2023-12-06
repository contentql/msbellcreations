'use client';

import Link from 'next/link';
import { useState,useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { RouterLink } from 'src/routes/components';

import EcommerceCartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function EcommerceAccountWishlistView() {
  const {wishItems, wishdeleteProduct}=useWish();
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
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Wishlist
      </Typography>

      <EcommerceCartList wishlist products={wishItems} />

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

{wishItems.length !== 0 && <Stack alignItems={{ sm: 'flex-end' }} sx={{ mt: 3 }}>
        <Stack spacing={3} sx={{ minWidth: 240 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'h6' }}
          >
            <Box component="span"> Subtotal</Box>
            {subtotal}
          </Stack>
 
          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={Addtocart}
          >
             {wishItems.length !== 0 ? 'Add to Cart' : 'Go to Products'}
          </Button>
        </Stack>
      </Stack>}
    </>
  );
}
