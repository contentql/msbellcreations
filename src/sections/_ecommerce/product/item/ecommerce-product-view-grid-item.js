'use client';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SimpleImageSlider from 'react-simple-image-slider';

import { Button } from '@mui/base';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import { useCart } from '../../../../app/store';
import { useWish } from '../../../../app/wishstore';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

const EcommerceProductViewGridItem = ({ product, sx, ...other }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [hover, setHover] = useState(false);
  const { cartItems, addProduct, updateQuantity } = useCart();
  const { wishItems, wishaddProduct, wishupdateQuantity } = useWish();

  const AddtoCart = () => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
      const { quantity } = existingProduct;
      toast.success(`${quantity + 1} times added to cart`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      addProduct({ ...product, quantity: 1 });
      toast.success('1 item added to cart', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const WishtoCart = () => {
    const existingProduct = wishItems.find((item) => item.id === product.id);

    if (existingProduct) {
      wishupdateQuantity(product.id, existingProduct.quantity + 1);
      const { quantity } = existingProduct;
      toast.success(`${quantity + 1} times added to wishlist`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      wishaddProduct({ ...product, quantity: 1 });
      toast.success('1 item added to wishlist', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // useEffect(() => {
  //   console.log('rendered')
  // }, [hover])

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

      <Box sx={{ position: 'relative',  mb: 2, height: isMobile ? 'auto' : '100%' }}>
        <Button onClick={AddtoCart}>
          <Fab
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              right: isMobile ? 30 : 8,
              zIndex: 9,
              bottom: 8,
              opacity: 0,
              position: 'absolute',
              // eslint-disable-next-line no-shadow
              transition: (theme) =>
                theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          >
            <Iconify icon="carbon:shopping-cart-plus" />
          </Fab>
        </Button>

        <Button onClick={WishtoCart}>
          <Fab
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              right: isMobile ? 74: 60,
              zIndex: 9,
              bottom: 8,
              opacity: 0,
              position: 'absolute',
              // eslint-disable-next-line no-shadow
              transition: (theme) =>
                theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          >
            <Iconify icon="carbon:favorite" />
          </Fab>
        </Button>
        <Image
          src={product.coverUrl.url}
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
        {/* <Box  sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <SimpleImageSlider
            width={isMobile ? 140 : 190}
            height={isMobile ? 140 : 190}
            images={product.images}
            showBullets={false}
            showNavs={hover}
            bgColor="#f4f6f8"
            navSize={30}
            navMargin={2}
            style={{ borderRadius: 10 ,overflow:"hidden"}}
            autoPlay={hover}
            loop
            autoPlayDelay={1}
          />
        </Box> */}
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category.label}
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
    </Stack>
  );
};

EcommerceProductViewGridItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    sold: PropTypes.number,
    label: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    images: PropTypes.array,
    priceSale: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
  sx: PropTypes.object,
};

export default EcommerceProductViewGridItem;
