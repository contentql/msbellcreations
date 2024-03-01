'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useUserStore } from 'src/app/auth-store';
import { countries } from 'src/assets/data';
import FormProvider, { RHFAutocomplete, RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [ 'Female', 'Male','Other'];

// ----------------------------------------------------------------------

export default function EcommerceAccountPersonalView() {
  const male=[5,7,9,10,12,13,14,15,17,18,19]
  const female=[1,2,3,4,6,8,11,16,20,21,22,23,24,25]
  const passwordShow = useBoolean();
  const { UserData, updateUserData } = useUserStore();
  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const { data:user, isLoading } = useQuery(
    ['user'],
     () =>
       fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${UserData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           "Authorization":`Bearer ${UserData.authToken}`
        },
      }).then((res) => res.json())
  );

  
 
  // if (!isLoading && data) {
  //   console.log("diff",data)
  //   const userData = {
  //     // userName: data.username,
  //     // email: data.email,
  //     birthday: data.birthday,
  //     zipCode: data.zipCode,
  //     city: data.city,
  //     country: data.country,
  //     streetAddress: data.streetAddress,
  //     phoneNumber: data.phoneNumber,
  //     gender: data.gender,
  //   };

 

  

  const defaultValues = {
    firstName: UserData?.firstName,
    lastName: UserData?.lastName,
    emailAddress: UserData?.email,
    phoneNumber: UserData?.phoneNumber,
    // birthday: UserData?.birthday,
    gender: UserData?.gender ? UserData.gender : 'male',
    streetAddress: UserData.streetAddress,
    streetAddress2: UserData.streetAddress2,
    zipCode: UserData?.zipCode,
    city: UserData.city,
    state:UserData?.state,
    country: UserData.country,
    
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceAccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
   // console.log("Data",data)
    const img=data.gender==="Male"?`${male[Math.floor(Math.random() * male.length)]}`:
    `${female[Math.floor(Math.random() * female.length)]}`;
   // console.log(img)
    updateUserData({...UserData,phoneNumber: data.phoneNumber,gender: data.gender,
      country: data.country,
      streetAddress: data.streetAddress,
      streetAddress2: data.streetAddress2,
      zipCode: data.zipCode,
      state:data.state,
      city: data.city,
      avatar:img,
      firstName:data.firstName,
      lastName: data.lastName,
      
    })
   
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
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            country: data.country,
            streetAddress: data.streetAddress,
            zipCode: data.zipCode,
            city: data.city,
            streetAddress2:data.streetAddress2,
            state: data.state,
            avatar:img,
            firstName:data.firstName,
            lastName:data.lastName
          }),
        }
      );
      toast.success('details saved Successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      const resData = await response.json();
     
    } catch (error) {
      toast.error('error please try again', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Personal
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFTextField name="firstName" label="First Name" />

        <RHFTextField name="lastName" label="Last Name" />

        <RHFTextField name="emailAddress" label="Email Address" InputProps={{ readOnly: true }} />

        <RHFTextField name="phoneNumber" label="Phone Number" />

        {/* <Controller
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Birthday"
              slotProps={{
                textField: {
                  helperText: error?.message,
                  error: !!error?.message,
                },
              }}
              {...field}
              value={field.value}
            />
          )}
        /> */}

        <RHFSelect native name="gender" label="Gender" defaultValue={'Female'}>
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Billing Address </Typography>

        <Stack spacing={2.5}>
          <RHFTextField name="streetAddress" label="Street Address" />
          <RHFTextField name="streetAddress2" label="Street Address 2" />
          <RHFTextField name="zipCode" label="Zip Code" />
          <RHFTextField name="city" label="City/Town" />
          <RHFTextField name="state" label="state" />
          <RHFAutocomplete
            name="country"
            label="Country"
            options={countries.map((country) => country.label)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              const { code, label, phone } = countries.filter(
                (country) => country.label === option
              )[0];

              if (!label) {
                return null;
              }

              return (
                <li {...props} key={label}>
                  <Iconify
                    key={label}
                    icon={`circle-flags:${code.toLowerCase()}`}
                    width={28}
                    sx={{ mr: 1 }}
                  />
                  {label} ({code}) +{phone}
                </li>
              );
            }}
          />
        </Stack>
      </Stack>

      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Save Details
      </LoadingButton>
    </FormProvider>
  );
}
