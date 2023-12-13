'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useUserStore } from 'src/app/auth-store';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function GuestBackgroundView() {
  const passwordShow = useBoolean();
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateUserData, UserData } = useUserStore();

  const [popup, setpopup] = useState(false);

  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    
    try {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        // reset();
        // console.log('DATA', user);
        // const registeredRole = await strapi
        // .query('role', 'users-permissions')
        // .findOne({ name: 'guest' });

        // console.log(registeredRole)
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/local/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.email,
            email: data.email,
            password: data.email,
            guest:true,
            isLoggedIn:true,
            avatar:`/assets/images/avatar/avatar_${Math.floor(Math.random() * 25) + 1}.jpg`
          })
        });
        
    
        const resData = await response.json();
        console.log("Res",resData)
        const { jwt } = resData;
        localStorage.setItem('token', jwt);

        
        if (response.ok) {
          const userData = {
            id:resData.user.id,
            authToken: resData.jwt,
            userName: resData.user.username,
            isLoggedIn: resData.user.confirmed,
            email:resData.user.email,
            zipCode: resData.user.zipCode,
              city: resData.user.city,
              country: resData.user.country,
              streetAddress: resData.user.streetAddress,
              phoneNumber: resData.user.phoneNumber,
              gender: resData.user.gender,
              guest:true,
              avatar:resData.user.avatar
          };
    
          updateUserData(userData);
          console.log("Helloooo1")
          router.push('/')
         
          setSuccess(true);
          toast.success('Successfully registered!!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          
        } else if (response.status === 400) {
          if(resData.error.message==="Email or Username are already taken"  )
          {
            router.push('/')
          }
          setLoginError(resData.error.message);
          toast.error(resData.error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else {
          setLoginError('An error occured, plese try again');
        }
      } catch (error) {
        console.error(error);
      }
    });
    

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Guest Login
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Don’t have an account? `}
        <Link
          component={RouterLink}
          href={paths.registerBackground}
          variant="subtitle2"
          color="primary"
        >
          Get started
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>

      <Button color="inherit" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {/* <Divider>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          or continue with
        </Typography>
      </Divider> */}

      {/* {renderSocials} */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
