'use client';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useCheckout } from 'src/app/checkoutstore';
import { fPercent, fCurrency } from 'src/utils/format-number';
import { useDummy } from 'src/app/dummy-store';

export default function EcommerceCartSummary({ tax, shipping, discount }) {
  const { cartItems, cartempty, Addtocartall} = useCart();
  const {dummyItems,addtodummy}=useDummy()
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {

    const newSubtotal = cartItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );

    // Update subtotal state
    setSubtotal(newSubtotal);

    // Calculate the final total including tax, shipping, and discount
    const newTotal = newSubtotal + shipping + discount - tax;

    // Update total state
    setTotal(newTotal);
  }, [cartItems, shipping, discount, tax]);

  

  const { deleteAll, addAll } = useCheckout();


  const gotocheckout = async () => {
    deleteAll();
    await addtodummy(cartItems)
    await cartempty();
    addAll(cartItems);
  };

  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Summary </Typography>

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Shipping" value={fCurrency(cartItems.length === 0 ? 0 : shipping)} />

        <Row
          label={`Discount (${fPercent(discount)})`}
          value={`-${fCurrency(subtotal === 0 ? 0 : discount)}`}
        />

        <Row label="Tax" value={fPercent(subtotal === 0 ? 0 : tax)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(subtotal === 0 ? 0 : total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <Button
        component={RouterLink}
        href={paths.eCommerce.checkout}
        size="large"
        variant="contained"
        color="inherit"
        onClick={gotocheckout}
      >
        Checkout
      </Button>
    </Stack>
  );
}

EcommerceCartSummary.propTypes = {
  tax: PropTypes.number,
  discount: PropTypes.number,
  shipping: PropTypes.number,
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
};
