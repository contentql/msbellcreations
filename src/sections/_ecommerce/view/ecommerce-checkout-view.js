'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { useUserStore } from 'src/app/auth-store';
import { useCheckout } from 'src/app/checkoutstore';
import { useOrder } from 'src/app/order-store';
import FormProvider from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';

import EcommerceCheckoutBillingDetails from '../checkout/ecommerce-checkout-billing-details';
import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';
import EcommerceCheckoutShippingDetails from '../checkout/ecommerce-checkout-shipping-details';

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


   const { data: configuration } = useQuery(['configuration'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/configuration?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );



  const { UserData,updateUserData } = useUserStore();
  const {deleteAllOrders, orderItems, orderaddAll, updateValues,userDetails,} = useOrder();
  const { checkItems, deleteAll } = useCheckout();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(false);


 



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

  // console.log('order products', orderItems);
  // console.log("user order details",userDetails)
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

  const productData=checkItems.map((item=>({ name: item.name,quantity:item.quantity, productId:item.id.toString() })))

  //console.log("product",productData)


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
          totalPrice:total.toFixed(2).toString(),
          product: productData,
       }),
      });
      if (res.ok) {
        const data = await res.json();
        DeleteOrder(userDetails.orderID)
        updateValues({...userDetails, OrderId:data.data.id})
      } else {
        console.error('Error:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const DeleteOrder = async (productId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDERS_API_TOKEN}`,
        },
      });
  
      if (response.ok) {
        console.log(`Product with ID ${productId} deleted successfully.`);
      } else {
        console.error(`Error deleting product. Status: ${response.status}, ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during DELETE request:', error.message);
    }
  };


    const send=async (data) => {

    updateUserData({...UserData, ...data});
   
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${UserData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${UserData.authToken}`,
            
          },
          body: JSON.stringify({
            phoneNumber: UserData.phoneNumber,
            gender: UserData.gender,
            country: UserData.country,
            streetAddress: UserData.streetAddress,
            zipCode: UserData.zipCode,
            city: UserData.city,
            firstName:UserData.firstName,
            lastName:UserData.lastName
          }),
        }
      );
     
    } catch (error) {
     
      console.error(error);
    }
  };

  
  const Updateuser=(data)=>{
    const newData = {};
    if(!UserData.firstName || UserData.firstName.trim() === "") newData.firstName = data.firstName;
    if(!UserData.lastName || UserData.lastName.trim() === "") newData.lastName = data.lastName;
    if(!UserData.phoneNumber || UserData.phoneNumber.trim() === "") newData.phoneNumber = data.phoneNumber;
    if(!UserData.city || UserData.city.trim() === "") newData.city = data.city;
    if(!UserData.zipCode || UserData.zipCode.trim() === "") newData.zipCode = data.zipCode;
    if(!UserData.streetAddress || UserData.streetAddress.trim() === "") newData.streetAddress = data.streetAddress;
    if(!UserData.country || UserData.country.trim() === "") newData.country = data.country;

    send(newData);
  }


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
      Updateuser(data)
      const { data: stripeData } = await axios.post('/api/stripe', {
        email: data.emailAddress,
        products: checkItems,
        tax:configuration?.data.tax,
        total:parseInt(subtotal),
        shipping:configuration?.data.shipping,
      });

      await router.push(stripeData.url);

      
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
              tax={checkItems.length !== 0 ? configuration?.data.tax : 0}
              total={total}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              shipping={checkItems.length !== 0 ? configuration?.data.shipping : 0}
              discount={checkItems.length !== 0 ? configuration?.data.discount : 0}
              products={checkItems}
              loading={isSubmitting}
              setTotal={setTotal}
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
