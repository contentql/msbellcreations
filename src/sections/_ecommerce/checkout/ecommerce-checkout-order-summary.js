import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCheckout } from 'src/app/checkoutstore';
import TextMaxLine from 'src/components/text-max-line';
import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutOrderSummary({
  tax,
  total,
  subtotal,
  shipping,
  discount,
  products,
  loading,
}) {
  console.log('checkout products', products);
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!products?.length && (
        <>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Shipping" value={fCurrency(shipping)} />

        <Row label="Discount (15%)" value={`-${fCurrency(discount)}`} />

        <Row label="Tax" value={fPercent(tax)} />
      </Stack>

      {/* <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      /> */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(subtotal + tax + shipping - discount)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
        onSubmit={() => console.log('Hello')}
      >
        Order Now
      </LoadingButton>
    </Stack>
  );
}

EcommerceCheckoutOrderSummary.propTypes = {
  discount: PropTypes.number,
  loading: PropTypes.bool,
  products: PropTypes.array,
  shipping: PropTypes.number,
  subtotal: PropTypes.number,
  tax: PropTypes.number,
  total: PropTypes.number,
};

// ----------------------------------------------------------------------

function ProductItem({ product, ...other }) {
  const { checkdeleteProduct, checkupdateQuantity } = useCheckout();
  const HandleDelete = () => {
    // eslint-disable-next-line react/prop-types
    checkdeleteProduct(product.id);
  };
  const HandleChange = (e) => {
    // eslint-disable-next-line react/prop-types
    checkupdateQuantity(product.id, parseInt(e.target.value, 10));
  };
  // eslint-disable-next-line react/prop-types
  const { quantity } = product;
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={product.coverUrl.url}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {product.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(product?.price)}
        </Typography>

        <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
          onChange={HandleChange}
          value={quantity}
        >
          {Array.from({ length: 100 }, (_, index) => index + 1).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <IconButton onClick={HandleDelete}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>
    </Stack>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    coverUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }),
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
  label: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string,
};
