'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box'; // Add this import
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import EcommerceCartItem from '../cart/ecommerce-cart-item';

export default function EcommerceWishlistView() {
  const [wishlist, setWishlist] = useState(_products.slice(0, 4));

  const calculateSubtotal = () => wishlist.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
 

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedWishlist = wishlist.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setWishlist(updatedWishlist);
  };

  const handleDelete = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    setWishlist(updatedWishlist);
  };

  const subtotal = calculateSubtotal();

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

      {wishlist.map((product) => (
        <EcommerceCartItem
          key={product.id}
          product={product}
          onQuantityChange={handleQuantityChange}
          onDelete={handleDelete}
          wishlist
        />
      ))}

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <Button
          component={RouterLink}
          href={paths.eCommerce.product}
          color="inherit"
          startIcon={<Iconify icon="carbon:chevron-left" />}
        >
          Continue Shopping
        </Button>

        <Box sx={{ minWidth: 240 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'h6' }}
          >
            <Box component="span"> Subtotal</Box>
            {`$${subtotal.toFixed(2)}`}
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
        </Box>
      </Container>
    </Container>
  );
}
