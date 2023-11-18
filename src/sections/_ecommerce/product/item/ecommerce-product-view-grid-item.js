'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Label from 'src/components/label';


import toast, { Toaster } from 'react-hot-toast';

import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import { useCart } from '../../../../app/store';
import { useWish } from '../../../../app/wishstore';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';
// ----------------------------------------------------------------------

export default function EcommerceProductViewGridItem({ product, sx, ...other }) {
  const { cartItems, addProduct, updateQuantity } = useCart();
  const AddtoCart = () => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
      const { quantity } = existingProduct; // Use existingProduct to get the correct quantity
      toast.success(`${quantity+1} times added to cart`)
      // toast.success(`${quantity+1} times added to cart`, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
    } else {
      addProduct({ ...product, quantity: 1 });
      toast.success('1 item added to cart')
      // toast.success('1 item added to cart', {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
    }
  };

  const { wishItems, wishaddProduct, wishupdateQuantity } = useWish();
  const WishtoCart = () => {
    const existingProduct = wishItems.find((item) => item.id === product.id);

    if (existingProduct) {
      wishupdateQuantity(product.id, existingProduct.quantity + 1);
      const { quantity } = existingProduct;
      toast.success(`${quantity+1} times added to wishlist`)
       // Use existingProduct to get the correct quantity
      // toast.success(`${quantity+1} times added to wishlist`, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
    } else {
      // If the product is not in the cart, add it with quantity 1
      wishaddProduct({ ...product, quantity: 1 });
      toast.success('1 item added to wishlist')
      
    }
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          SALE
        </Label>
      )}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Fab
          // component={RouterLink}
          // href={paths.eCommerce.product}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" onClick={AddtoCart} />
        </Fab>
        <Fab
          // component={RouterLink}
          // href={paths.eCommerce.product}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 50,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:favorite" onClick={WishtoCart} />
        </Fab>

        <Image
          src={product.coverUrl}
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category}
        </TextMaxLine>

        <Link
          component={RouterLink}
          href={`${paths.eCommerce.products}/${product.id}`}
          color="inherit"
        >
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} priceSale={product.priceSale} />

        <ProductRating ratingNumber={product.ratingNumber} label={`${product.sold} sold`} />
      </Stack>
      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </Stack>
  );
}

EcommerceProductViewGridItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    sold: PropTypes.number,
    label: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    priceSale: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
  sx: PropTypes.object,
};
