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

export default function LoginBackgroundView() {
  const passwordShow = useBoolean();
  const [loginError, setLoginError] = useState('');
  // const  = useUserStore((store) => store?.updateUserData);
  const { updateUserData, UserData } = useUserStore();

  const router = useRouter();
  

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email: identifier, password } = data;
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });
      const resData = await response.json();

      const { jwt } = resData;
      localStorage.setItem('token', jwt);
      if (response.ok) {
        const userData = {
          id: resData.user.id,
          authToken: resData.jwt,
          isLoggedIn: true,
          userName: resData.user.username,
          email: resData.user.email,
          birthday: resData.user.birthday,
          zipCode: resData.user.zipCode,
          city: resData.user.city,
          country: resData.user.country,
          streetAddress: resData.user.streetAddress,
          phoneNumber: resData.user.phoneNumber,
          gender: resData.user.gender,
          avatar:resData.user.avatar,
          firstName:resData.user.firstName,
          lastName:resData.user.lastName
        };
        updateUserData(userData);
        router.push('/');
      } else {
        toast.error(resData.message[0].messages[0].message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('Invalid credentials', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoginError('Somthing went wrong');
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Login
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

        <RHFTextField
          name="password"
          label="Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Forgot password?
        </Link>

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
        <Button
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
          href={paths.guest}
        >
          login as guest
        </Button>
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
