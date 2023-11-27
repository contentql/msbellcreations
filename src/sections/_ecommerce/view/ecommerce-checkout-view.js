'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from 'src/components/hook-form';

import EcommerceCheckoutNewCardForm from '../checkout/ecommerce-checkout-new-card-form';
import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';
import EcommerceCheckoutShippingMethod from '../checkout/ecommerce-checkout-shipping-method';
import EcommerceCheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';
import EcommerceCheckoutShippingDetails from '../checkout/ecommerce-checkout-shipping-details';
import { useCheckout } from 'src/app/checkoutstore';
// ----------------------------------------------------------------------

const SHIPPING_OPTIONS = [
  {
    label: 'Free',
    value: 'free',
    description: '5-7 Days delivery',
    price: 0,
  },
  {
    label: 'Standard',
    value: 'standard',
    description: '3-5 Days delivery',
    price: 10,
  },
  {
    label: 'Express',
    value: 'express',
    description: '2-3 Days delivery',
    price: 20,
  },
];

const PAYMENT_OPTIONS = [
  {
    label: 'Paypal',
    value: 'paypal',
    description: '**** **** **** 1234',
  },
  {
    label: 'MasterCard',
    value: 'mastercard',
    description: '**** **** **** 3456',
  },
  {
    label: 'Visa',
    value: 'visa',
    description: '**** **** **** 6789',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {

  const {checkItems,deleteAll}=useCheckout();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newSubtotal = checkItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setSubtotal(newSubtotal);
    const newTotal = newSubtotal 

    setTotal(newTotal);
  }, [checkItems]);



  const router = useRouter();

  const formOpen = useBoolean();

  const EcommerceCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: 'nannie_abernathy70@yahoo.com',
    phoneNumber: '365-374-4961',
    password: '',
    confirmPassword: '',
    streetAddress: '',
    city: '',
    country: 'United States',
    zipCode: '',
    shipping: 'free',
    paymentMethods: 'mastercard',
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      router.push(paths.eCommerce.orderCompleted);
      console.log('DATA', data);
      deleteAll();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Checkout
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              <div>
                <StepLabel title="Personal Details" step="1" />
                <EcommerceCheckoutPersonalDetails />
              </div>

              <div>
                <StepLabel title="Shipping Details" step="2" />
                <EcommerceCheckoutShippingDetails />
              </div>

              <div>
                <StepLabel title="Shipping Method" step="3" />
                <EcommerceCheckoutShippingMethod options={SHIPPING_OPTIONS} />
              </div>

              <div>
                <StepLabel title="Payment Method" step="4" />

                <EcommerceCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                <Divider sx={{ my: 3 }} />

                <Stack alignItems="flex-end">
                  <Button
                    color={formOpen.value ? 'error' : 'inherit'}
                    startIcon={
                      <Iconify icon={formOpen.value ? 'carbon:close' : 'carbon:add'} width={24} />
                    }
                    onClick={formOpen.onToggle}
                  >
                    {formOpen.value ? 'Cancel' : 'Add New Card'}
                  </Button>
                </Stack>

                <Collapse in={formOpen.value} unmountOnExit>
                  <EcommerceCheckoutNewCardForm />
                </Collapse>
              </div>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCheckoutOrderSummary
              tax={checkItems.length!==0?7:0}
              total={0}
              subtotal={subtotal}
              shipping={checkItems.length!==0?55.47:0}
              discount={checkItems.length!==0?16.17:0}
              products={checkItems}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}


function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
