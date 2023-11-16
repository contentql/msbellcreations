// EcommerceCartList.js

import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import Scrollbar from 'src/components/scrollbar';

import EcommerceCartItem from './ecommerce-cart-item';

export default function EcommerceCartList({ products, onQuantityChange, onDelete }) {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 2,
          minWidth: 720,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack flexGrow={1}>Item</Stack>
        <Stack sx={{ width: 120 }}>Qty</Stack>
        <Stack sx={{ width: 120 }}>Subtotal</Stack>
        <Stack sx={{ width: 36 }} />
        {onDelete && <Stack sx={{ width: 36 }} />} {/* Render only if onDelete is provided */}
      </Stack>

      {products.map((product) => (
        <EcommerceCartItem
          key={product.id}
          product={product}
          wishlist={false} // Adjust as needed
          onQuantityChange={onQuantityChange}
          onDelete={onDelete} // Pass the onDelete prop
        />
      ))}
    </Scrollbar>
  );
}

EcommerceCartList.propTypes = {
  products: PropTypes.array,
  onQuantityChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func, // onDelete is now an optional prop
};
