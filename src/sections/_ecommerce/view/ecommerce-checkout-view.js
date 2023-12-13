'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { _products } from 'src/_mock';
import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { useUserStore } from 'src/app/auth-store';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCheckout } from 'src/app/checkoutstore';
import { useOrder } from 'src/app/order-store';
import FormProvider from 'src/components/hook-form';

import EcommerceCheckoutNewCardForm from '../checkout/ecommerce-checkout-new-card-form';
import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';
import EcommerceCheckoutBillingDetails from '../checkout/ecommerce-checkout-billing-details';
import EcommerceCheckoutShippingMethod from '../checkout/ecommerce-checkout-shipping-method';
import EcommerceCheckoutShippingDetails from '../checkout/ecommerce-checkout-shipping-details';
import EcommerceCheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';

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
  const { UserData } = useUserStore();
  const {deleteAllOrders, orderItems, orderaddAll, updateValues,userDetails,} = useOrder();
  const { checkItems, deleteAll } = useCheckout();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    const newSubtotal = checkItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setSubtotal(newSubtotal);
    const newTotal = newSubtotal;

    setTotal(newTotal);
  }, [checkItems]);

  useEffect(()=>{
    deleteAllOrders()
  },[])

  const router = useRouter();

  const formOpen = useBoolean();

  const EcommerceCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    firstName: UserData.firstName,
    lastName: UserData.lastName,
    emailAddress: UserData.email,
    phoneNumber: UserData?.phoneNumber ? UserData.phoneNumber : '',
    // password: '',
    // confirmPassword: '',
    streetAddress: UserData?.streetAddress ? UserData?.streetAddress : '',
    city: UserData?.city ? UserData?.city : '',
    country: UserData?.country ? UserData?.country : '',
    zipCode: UserData?.zipCode ? UserData?.zipCode : '',
    ShippingstreetAddress: '',
    Shippingcity: '',
    Shippingcountry: 'United States',
    ShippingzipCode: '',
    totalPrice:""
    // shipping: 'free',
    // paymentMethods: 'mastercard',
    // newCard: {
    //   cardNumber: '',
    //   cardHolder: '',
    //   expirationDate: '',
    //   ccv: '',
    // },
  };

  console.log('order products', orderItems);
  console.log("user order details",userDetails)
  const methods = useForm({
    resolver: yupResolver(EcommerceCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const handleSwitchChange = () => {
    if (!switchChecked) {
      setValue('ShippingstreetAddress', getValues('streetAddress'));
      setValue('ShippingzipCode', getValues('zipCode'));
      setValue('Shippingcity', getValues('city'));
      setValue('Shippingcountry', getValues('country'));
    } else {
      setValue('ShippingstreetAddress', getValues(''));
      setValue('ShippingzipCode', getValues(''));
      setValue('Shippingcity', getValues(''));
      setValue('Shippingcountry', 'United States');
    }
    setSwitchChecked(!switchChecked);
  };

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${UserData.authToken}`,
  //       },
      //   body: JSON.stringify({
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     emailAddress: data.emailAddress,
      //     phoneNumber: data.phoneNumber,
      //     streetAddress: data.streetAddress,
      //     country: data.country,
      //     city: data.city,
      //     Shippingcity: data.Shippingcity,
      //     Shippingcountry: data.Shippingcountry,
      //     ShippingzipCode: data.ShippingzipCode,
      //     ShippingstreetAddress: data.ShippingstreetAddress,
      //     zipCode: data.zipCode,
      //     product: checkItems,
      //  }),
  //     });
  //     const resData = await response.json();
  //     // await new Promise((resolve) => setTimeout(resolve, 500));
  //     // reset();
  //     router.push(paths.eCommerce.orderCompleted);
  //     console.log('DATA', data);
  //     // deleteAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const postData = async (data) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDERS_API_TOKEN}`,
        },
         body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          phoneNumber: data.phoneNumber,
          streetAddress: data.streetAddress,
          country: data.country,
          city: data.city,
          Shippingcity: data.Shippingcity,
          Shippingcountry: data.Shippingcountry,
          ShippingzipCode: data.ShippingzipCode,
          ShippingstreetAddress: data.ShippingstreetAddress,
          zipCode: data.zipCode,
          totalPrice:subtotal.toString(),
          product: checkItems,
       }),
      });
      if (res.ok) {
        const data = await res.json();
        updateValues({...userDetails, OrderId:data.data.id})
      } else {
        console.error('Error:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const triggerStripe = handleSubmit(async (data) => {
  
    orderaddAll(checkItems);
    updateValues({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      city:data.city,
      country:data.country,
      zipCode:data.zipCode,
      streetAddress:data.streetAddress,
      Shippingcity:data.Shippingcity,
      Shippingcountry:data.Shippingcountry,
      ShippingzipCode:data.ShippingzipCode,
      ShippingstreetAddress:data.ShippingstreetAddress,
      totalPrice:subtotal.toString()
    });
    try {
      postData(data);
      console.log('checkout data in stripe', data);
      const { data: stripeData } = await axios.post('/api/stripe', {
        email: data.emailAddress,
        products: checkItems,
      });

      await router.push(stripeData.url);

      await console.log(stripeData);
    } catch (error) {
      console.log(error);
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

      <FormProvider methods={methods} onSubmit={triggerStripe}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              <div>
                <StepLabel title="Personal Details" step="1" />
                <EcommerceCheckoutPersonalDetails />
              </div>

              <div>
                <StepLabel title="Building Details" step="2" />
                <EcommerceCheckoutShippingDetails />
              </div>

              <div>
                <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                  <StepLabel title="Shipping Details" step="3" />
                  <Box>
                    <span>same as Billing address</span>
                    <Switch
                      inputProps={{ 'aria-label': 'Basic Switch' }}
                      checked={switchChecked}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                </Box>

                <EcommerceCheckoutBillingDetails switchChecked={switchChecked} />
              </div>

              {/* <div>
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
              </div> */}
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCheckoutOrderSummary
              tax={checkItems.length !== 0 ? 7 : 0}
              total={0}
              subtotal={subtotal}
              shipping={checkItems.length !== 0 ? 55.47 : 0}
              discount={checkItems.length !== 0 ? 16.17 : 0}
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
