import { add } from 'date-fns';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { _products } from 'src/_mock/_products';
import { RouterLink } from 'src/routes/components';

import ProductColorPicker from '../common/product-color-picker';
import ProductOptionPicker from '../common/product-option-picker';
import ProductCountdownBlock from '../common/product-countdown-block';

// ----------------------------------------------------------------------

// const COLOR_OPTIONS = [
//   { label: '#FA541C', value: 'red' },
//   { label: '#754FFE', value: 'violet' },
//   { label: '#00B8D9', value: 'cyan' },
//   { label: '#36B37E', value: 'green' },
// ];

// const MEMORY_OPTIONS = [
//   { label: '128GB', value: '128gb' },
//   { label: '256GB', value: '256gb' },
//   { label: '512GB', value: '512gb' },
//   { label: '1TB', value: '1tb' },
// ];

// ----------------------------------------------------------------------

export default function EcommerceLandingSpecialOffer({specialOffer}) {
  // const [color, setColor] = useState('red');

  // const [memory, setMemory] = useState('128gb');

  // const handleChangeColor = useCallback((event) => {
  //   setColor(event.target.value);
  // }, []);

  // const handleChangeMemory = useCallback((event) => {
  //   setMemory(event.target.value);
  // }, []);

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Special Offer
      </Typography>

      <Box
        gap={{ xs: 5, md: 8 }}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        <SpecialOfferCountdown
          label={specialOffer.lable}
          name={specialOffer.name}
          price={specialOffer.price}
          expired={add(new Date(), { days: 1, hours: 8 })}
        />

        <Box sx={{ borderRadius: 1.5, bgcolor: 'background.neutral' }}>
          <Image src={specialOffer.coverUrl.url} />
        </Box>

        <SpecialOfferBuyNow
        // color={color}
        // memory={memory}
        // onChangeColor={handleChangeColor}
        // onChangeMemory={handleChangeMemory}
        />
      </Box>
    </Container>
  );
}

  EcommerceLandingSpecialOffer.propTypes = {
    specialOffer: PropTypes.shape({
      coverUrl: PropTypes.shape({
        url: PropTypes.string,
      }),
      lable: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
    }),
  };


// ----------------------------------------------------------------------

function SpecialOfferCountdown({ expired, label, name, price, sx, ...other }) {
  const product = _products.slice(0, 1);
  console.log('product name', product[0].name);
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 5,
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: (theme) => theme.customShadows.z24,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        {label}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>
        {product[0].name}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          px: 2,
          py: 1,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }}
      >
        {price}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', my: 3, width: 1 }} />
      <ProductCountdownBlock
        expired={expired}
        sx={{
          '& .value': {
            color: 'text.primary',
            bgcolor: 'transparent',
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          },
          '& .label': { color: 'text.secondary' },
          '& .separator': { color: 'inherit' },
        }}
      />
    </Stack>
  );
}

SpecialOfferCountdown.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  price: PropTypes.string,
  expired: PropTypes.instanceOf(Date),
};

// ----------------------------------------------------------------------

function SpecialOfferBuyNow({ color, memory, onChangeColor, onChangeMemory, ...other }) {
  const product = _products.slice(0, 1);
  console.log('product data', product);
  return (
    <Stack spacing={3} alignItems="flex-start" {...other}>
      <Stack spacing={1}>
        <Typography variant="h4">{product[0].name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cayenne pepper is a hot and spicy herb that contains capsaicin, a compound that blocks the
          pain signals from reaching your brain. Cayenne pepper can help reduce muscle, joint, and
          nerve pain from various conditions, such as arthritis, shingles, back aches, fibromyalgia,
          and diabetic neuropathy (123).
        </Typography>
      </Stack>

      {/* <Stack spacing={2}>
        <Typography variant="subtitle2">Color</Typography>
        <ProductColorPicker value={color} onChange={onChangeColor} options={COLOR_OPTIONS} />
      </Stack>
*/}
      <Stack spacing={2}>
        <Typography variant="h4">Size</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Approx. 1 oz to .8 OZ in tin
        </Typography>
      </Stack>
      <Button
        component={RouterLink}
        href={`${paths.eCommerce.products}/${product[0].id}`}
        size="large"
        color="inherit"
        variant="contained"
      >
        Buy Now
      </Button>
    </Stack>
  );
}

SpecialOfferBuyNow.propTypes = {
  color: PropTypes.string,
  memory: PropTypes.string,
  onChangeColor: PropTypes.func,
  onChangeMemory: PropTypes.func,
};
