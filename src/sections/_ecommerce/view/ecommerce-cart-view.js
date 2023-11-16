"use client"


import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';

export default function EcommerceCartView() {
  const [subtotal, setSubtotal] = useState(0);
  const [products, setProducts] = useState(_products.slice(0, 4).map(product => ({ ...product, quantity: 1 }))); // Include quantity property

  useEffect(() => {
    const calculatedSubtotal = products.reduce((temp, ele) => temp + ele.price * ele.quantity, 0);
    setSubtotal(calculatedSubtotal);
    console.log(products)
  }, [products]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);

    const updatedSubtotal = updatedProducts.reduce((temp, ele) => temp + ele.price * ele.quantity, 0);
    setSubtotal(updatedSubtotal);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

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
          <EcommerceCartList
            products={products}
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceCartSummary
            products={products} // Pass the updated products array
            tax={2}
            total={500} // You can set a default value or calculate it based on other factors
            subtotal={subtotal}
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
