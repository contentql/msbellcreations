import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

import ProductPrice from '../../common/product-price';


// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#FA541C', value: 'red' },
  { label: '#754FFE', value: 'violet' },
  { label: '#00B8D9', value: 'cyan' },
  { label: '#36B37E', value: 'green' },
];

const MEMORY_OPTIONS = [
  { label: '128GB', value: '128gb' },
  { label: '256GB', value: '256gb' },
  { label: '512GB', value: '512gb' },
  { label: '1TB', value: '1tb' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsInfo({
  productId,
  name,
  price,
  ratingNumber,
  totalReviews,
  priceSale,
  caption,
}) {
  const mdUp = useResponsive('up', 'md');

  const [option,setOption]=useState(1);

  const [color, setColor] = useState('red');

  const [memory, setMemory] = useState('128gb');

  const handleChangeColor = useCallback((event) => {
    setColor(event.target.value);
  }, []);

  const handleChangeMemory = useCallback((event) => {
    setMemory(event.target.value);
  }, []);

  const { addProduct, updateQuantity, cartItems } = useCart();

  

  const addtocart = () => {
    const existingProductInCart = cartItems.find((item) => item.id === productId);

    if (existingProductInCart) {
      updateQuantity(existingProductInCart.id, parseInt(existingProductInCart.quantity, 10) + parseInt(option, 10));
    } else {
      const _mockProduct = _products.filter((product) => product.id === productId).at(0);
      addProduct({... _mockProduct, quantity: option });
    }
  };

  return (
    <>
      <Label color="success" sx={{ mb: 3 }}>
        In Stock
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={ratingNumber} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({totalReviews} reviews)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice price={100} priceSale={priceSale} sx={{ typography: 'h5' }} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack sx={{ my: 8 }} spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }}>
        <TextField
          select
          hiddenLabel
          onChange={(e)=>{setOption(e.target.value)}}
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((options) => (
            <option key={options} value={options} >
              {options}
            </option>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={addtocart}
          >
            Add to Cart
          </Button>

          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row" justifyContent={{ xs: 'center', md: 'unset' }}>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:share" sx={{ mr: 1 }} /> Share
        </Stack>
      </Stack>
    </>
  );
}

EcommerceProductDetailsInfo.propTypes = {
  productId:PropTypes.string,
  caption: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  ratingNumber: PropTypes.number,
  totalReviews: PropTypes.number,
};
