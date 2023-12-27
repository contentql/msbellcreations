import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Button } from '@mui/base';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { useCart } from 'src/app/store';
import Label from 'src/components/label';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

// ----------------------------------------------------------------------

export default function EcommerceProductViewListItem({ product, ...other }) {
  const { cartItems, addProduct, updateQuantity } = useCart();
  // const { cartItems, addProduct, updateQuantity } = useCart();
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

  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
      }}
      {...other}
    >
      {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          SALE
        </Label>
      )}

      <Fab
        component={RouterLink}
        href={paths.eCommerce.product}
        className="add-to-wish"
        color="primary"
        size="small"
        sx={{
          right: 16,
          zIndex: 9,
          top: 8,
          opacity: 0,
          position: 'absolute',
          transition: (theme) =>
            theme.transitions.create('opacity', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
        }}
      >
        <Iconify icon="carbon:shopping-cart-plus" />
      </Fab>

      <Image
        src={product.coverUrl.url}
        sx={{
          mr: 2,
          width: 160,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
            {product?.category?.name}
          </TextMaxLine>

          <Link
            component={RouterLink}
            href={`${paths.eCommerce.products}/${product.id}`}
            color="inherit"
          >
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>

        <ProductRating ratingNumber={product.ratingNumber} label={`${product.sold} sold`} />

        <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
          {product.caption}
        </TextMaxLine>

        <ProductPrice
          price={product.price}
          priceSale={product.priceSale}
          sx={{ typography: 'h6' }}
        />
      </Stack>
      <Button onClick={AddtoCart}>
        <Fab
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            top: 8,
            opacity: 0,
            position: 'absolute',
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
            right: 60,
            zIndex: 9,
            top: 8,
            opacity: 0,
            position: 'absolute',
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
    </Stack>
  );
}

EcommerceProductViewListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    caption: PropTypes.string,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sold: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
};
