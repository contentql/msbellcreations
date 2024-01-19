import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TwitterIcon,
} from 'react-share';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FileCopyIcon from '@mui/icons-material/FileCopy';

import 'react-toastify/dist/ReactToastify.css';

import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useCheckout } from 'src/app/checkoutstore';
import { useResponsive } from 'src/hooks/use-responsive';
import { SplashScreen } from 'src/components/loading-screen';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { toast, ToastContainer } from 'react-toastify';
import { useUserStore } from 'src/app/auth-store';

import ProductPrice from '../../common/product-price';

import { FacebookIcon, LinkedinIcon, XIcon, WhatsappIcon } from 'react-share';

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
  onOpenForm,
}) {
  const actions = [
    {
      icon: (
        <TwitterShareButton url={window.location.href} title={name} windowWidth={900}>
          <XIcon size={40} round="true" />
        </TwitterShareButton>
      ),
      name: 'Twitter',
    },
    {
      icon: (
        <LinkedinShareButton url={window.location.href} title={name} windowWidth={900}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      ),
      name: 'Linkedin',
    },
    {
      icon: (
        <WhatsappShareButton
          url={window.location.href}
          title={name}
          windowWidth={900}
          windowHeight={800}
          separator=":: "
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      ),

      name: 'Whatsapp',
    },
    {
      icon: (
        <FacebookShareButton url={window.location.href} windowWidth={900}>
          <FacebookIcon size={40} round="true" />
        </FacebookShareButton>
      ),
      name: 'Facebook',
    },
    {
      icon: (
        <FileCopyIcon
          sx={{ color: 'black' }}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('copied', {
              position: 'bottom-right',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }}
        />
      ),
      name: 'Copy',
    },
  ];

  const { UserData } = useUserStore();
  const { data, isLoading } = useQuery(['individualProduct'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/products/${productId}?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const _products = data?.data;
  const mdUp = useResponsive('up', 'md');

  const [option, setOption] = useState(1);

  const [color, setColor] = useState('red');

  const [memory, setMemory] = useState('128gb');

  const handleChangeColor = useCallback((event) => {
    setColor(event.target.value);
  }, []);

  const handleChangeMemory = useCallback((event) => {
    setMemory(event.target.value);
  }, []);

  const { addProduct, updateQuantity, cartItems } = useCart();
  const { checkaddProducts, checkItems, checkupdateQuantity, deleteAll } = useCheckout();

  const gotocheckout = async () => {
    deleteAll();
    const product = data?.data;
    checkaddProducts(product);
    checkupdateQuantity(product.id, parseInt(option, 10));
  };

  const addtocart = () => {
    const existingProductInCart = cartItems.find((item) => item.id === productId);

    if (existingProductInCart) {
      updateQuantity(
        existingProductInCart.id,
        parseInt(existingProductInCart.quantity, 10) + parseInt(option, 10)
      );
    } else {
      const _mockProduct = data?.data;
      addProduct(_mockProduct);
      updateQuantity(_mockProduct.id, option);
    }
  };
  if (isLoading) {
    return <SplashScreen />;
  }
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
        <ProductPrice price={price} priceSale={priceSale} sx={{ typography: 'h5' }} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack
        sx={{ my: 8 }}
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
      >
        <TextField
          select
          hiddenLabel
          onChange={(e) => {
            setOption(e.target.value);
          }}
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((options) => (
            <option key={options} value={options}>
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
            href={paths.eCommerce.checkout}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
            onClick={gotocheckout}
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="flex flex-wrap gap-y-4 gap-3" style={{ display: 'flex', alignItems: 'center' }}>
        {UserData?.isLoggedIn && (
          <Button
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:edit" />}
            onClick={onOpenForm}
          >
            Review
          </Button>
        )}

        <Stack spacing={1} direction="row">
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: 'relative',
              bottom: 8,
              
              top: 0,
            }}
            icon={<ShareIcon />}
            
            direction="right"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                sx={{ ml: '1px', boxShadow: 0 }}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Stack>
      </div>
    </>
  );
}

EcommerceProductDetailsInfo.propTypes = {
  productId: PropTypes.number,
  caption: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  ratingNumber: PropTypes.number,
  totalReviews: PropTypes.string,
};
