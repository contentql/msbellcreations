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
  
  const female=[1,2,3,4,6,8,11,16,20,21,22,23,24,25]
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
      const users = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users-permissions/roles`);

      // Logging the response after converting it to JSON
      const datas = await users.json();
      const roleId=(datas.roles.find((role)=>role.name==="Guest")).id;
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.email,
            email: data.email,
            password: data.email,
            isLoggedIn:true,
            avatar:`/assets/images/avatar/avatar_${female[Math.floor(Math.random() * female.length)]}.jpg`,
            role:roleId,
            confirmed:true,
             

          })
        });
        
    
        const resData = await response.json();
        console.log(resData)
       
        const { jwt } = resData;
        localStorage.setItem('token', jwt);

        
        if (response.ok) {
          const userData = {
            id:resData.id,
            authToken: resData.jwt,
            userName: resData.username,
            isLoggedIn: resData.confirmed,
            email:resData.email,
            zipCode: resData.zipCode,
              city: resData.city,
              country: resData.country,
              streetAddress: resData.streetAddress,
              phoneNumber: resData.phoneNumber,
              gender: resData.gender,
              avatar:resData.avatar,
          };
    
          updateUserData(userData);
         
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
          setLoginError(resData.error.message);
          toast.error(`${resData.error.message==="Email already taken"? "Please reset your password for login":resData.error.message} `, {
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

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Reset password?
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
