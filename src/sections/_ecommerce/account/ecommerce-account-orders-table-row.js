import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import axios from 'axios';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useOrder } from 'src/app/order-store';
//  utils
import { useQuery } from 'react-query';
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useCheckout } from 'src/app/checkoutstore';
// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersTableRow({ row, onSelectRow, selected }) {
  const { addAll, deleteAll } = useCheckout();
  const { userDetails, updateValues } = useOrder();

  const router = useRouter();

  const { data: products } = useQuery(['orderedproducts'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/products?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const handleCheckout = (id, product) => {
    //console.log('Input Product Array:', product);

    const commonElements = products?.data?.filter((item1) =>
      product.some((item2) => item2.productId.toString() === item1.id.toString())
    );

    //console.log('Common Elements:', commonElements);

    const newArray = commonElements.map((item1) => {
      const match = product.find((item2) => item2.productId.toString() === item1.id.toString());
      return match ? { ...item1, quantity: match.quantity } : item1;
    });

    //console.log('Quantity Added Array:', newArray);

    deleteAll();
    //console.log('common', commonElements);
    addAll(newArray);
    updateValues({ ...userDetails, orderID: id });
  };

  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handlehoverOpen = useCallback((event) => {
    setHover(event.currentTarget);
  }, []);

  const handlehoverClose = useCallback(() => {
    setHover(null);
  }, []);

  const inputStyles = {
    pl: 1,
    [`&.${inputBaseClasses.focused}`]: {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox color="primary" checked={selected} onClick={onSelectRow} /> */}
        </TableCell>

        <TableCell sx={{ px: 1 }}>{row.id}</TableCell>

        <TableCell sx={{ px: 1 }} onClick={handlehoverOpen}>
          <Tooltip title="click to see all products" arrow>
            <InputBase value={row.product.map((data) => data.name).join(',')} />
          </Tooltip>
        </TableCell>
        <Popover
          open={Boolean(hover)}
          anchorEl={hover}
          onClose={handlehoverClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          slotProps={{
            paper: {
              sx: { width: 500 },
            },
          }}
        >
          <Grid container spacing={2} className='py-2'>
            <Grid item xs={9}>
              <Typography variant="h6">
              Product Name
            </Typography>
            </Grid>
            <Grid item xs={3} >
             <Typography className='text-center' variant="h6">Quantity</Typography>
            </Grid>
          </Grid>
         
          {row.product.map((products) => (
            <>
              <Divider />
             <Grid container spacing={2} className='py-2'>
            <Grid item xs={9}>
              <Typography  >
              {products.name}
            </Typography>
            </Grid>
            <Grid item xs={3}>
             <Typography className='text-center'>{products.quantity}</Typography>
            </Grid>
          </Grid>
            </>
          ))}
        </Popover>

        <TableCell>{fDate(row.createdAt)}</TableCell>

        <TableCell sx={{ px: 1 }}>{fCurrency(row.totalPrice)}</TableCell>
        <TableCell sx={{ px: 1 }}>
          {row.status === false ? (
            <Tooltip title="click to pay" placement="top" arrow>
              {' '}
              <Button
                component={RouterLink}
                href={paths.eCommerce.checkout}
                sx={{ color: 'red' }}
                variant="outlined"
                onClick={() => handleCheckout(row.id, row.product)}
              >
                Pending
              </Button>
            </Tooltip>
          ) : (
            <Button sx={{ color: 'green' }} variant="outlined">
              Success
            </Button>
          )}
        </TableCell>

        {/* <TableCell>
          <Label
            color={
              (row.status === 'Completed' && 'success') ||
              (row.status === 'To Process' && 'warning') ||
              (row.status === 'Cancelled' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell> */}

        {/* <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 160 },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:view" sx={{ mr: 1 }} /> View
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

EcommerceAccountOrdersTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
