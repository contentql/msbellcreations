'use client';

import { m } from 'framer-motion';
import { useMutation } from 'react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useOrder } from 'src/app/order-store';
import { useUserStore } from 'src/app/auth-store';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { varBounce, MotionContainer } from 'src/components/animate';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function EcommerceOrderCompletedView() {
  const { userDetails, orderItems, deleteAllOrders, resetUpdateValues } = useOrder();
  const { UserData } = useUserStore();

  const putData = async (orderId) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDERS_API_TOKEN}`,
        },
        body: JSON.stringify({
          Email_config: true,
        }),
      });
      if (res.ok) {
        console.log('put success');
      } else {
        console.error('Error:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const { mutate, isLoading } = useMutation(() => putData(userDetails.OrderId), {
    onSuccess: async (data) => {
      deleteAllOrders();
      resetUpdateValues();
    },

    onError: (error) => {
      console.log(error);
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries('create');
    // },
  });

  // const collectedData  = mutate()
  console.log('orders', UserData.authToken, userDetails, orderItems);

  useEffect(() => {
    if (orderItems.length > 0) {
      mutate();
    }
  }, []);

  return (
    <Container
      component={MotionContainer}
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <m.div variants={varBounce().in}>
        <Box sx={{ fontSize: 128 }}>🎉</Box>
      </m.div>

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Your order is complete!</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          You will be receiving a confirmation email with order details.
        </Typography>
      </Stack>

      <Button
        component={RouterLink}
        href={paths.eCommerce.products}
        size="large"
        color="inherit"
        variant="contained"
        startIcon={<Iconify icon="carbon:chevron-left" />}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
