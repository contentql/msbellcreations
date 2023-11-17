
import React from 'react';
import PropTypes from 'prop-types';

// EcommerceCartItem.js


import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useCart } from 'src/app/store';
import Image from 'src/components/image';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';

export default function EcommerceCartItem({ product, wishlist }) {
  const { addProduct,updateQuantity,deleteProduct } = useCart();
  const { wishupdateQuantity,wishdeleteProduct } = useWish();

  const handleQuantityChange = (event) => 
    wishlist ? wishupdateQuantity(product.id, parseInt(event.target.value, 10)) : updateQuantity(product.id, parseInt(event.target.value, 10));
  
  

  const Handledelete = () => 
     wishlist ? wishdeleteProduct(product.id) : deleteProduct(product.id);
 
  

  const wishtocart= (produc)=>{
     addProduct(produc)
    wishdeleteProduct(produc.id)
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={product.coverUrl}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{product.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Color: Grey Space
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 120 }}>
        <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
          value={product.quantity}
          onChange={handleQuantityChange}
        >
          {Array.from({length: 50}, (_, index) => index + 1).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <Stack sx={{ width: 120, typography: 'subtitle2' }}>
        {fCurrency(product.price * product.quantity)}
      </Stack>

      <IconButton onClick={Handledelete}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton onClick={()=>{wishtocart(product)}}>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}

EcommerceCartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    coverUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number, // Make sure to include quantity in the propTypes
  }),
  wishlist: PropTypes.bool,
};
