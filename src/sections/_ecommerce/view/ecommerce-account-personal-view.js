'use client';

import * as Yup from 'yup';
import { useQuery } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';
import { useUserStore } from 'src/app/auth-store';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// ----------------------------------------------------------------------

export default function EcommerceAccountPersonalView() {
  const passwordShow = useBoolean();
  const { UserData, updateUserData } = useUserStore();
  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  // const { data, isLoading } = useQuery(
  //   ['user'],
  //   async () =>
  //     await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${UserData.id}`, {
  //       method: 'GET',
  //     }).then((res) => res.json())
  // );

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
  //   updateUserData(userData)};



  const defaultValues = {
    firstName: UserData?.userName,
    lastName: 'Simon',
    emailAddress: UserData?.email,
    phoneNumber: UserData?.phoneNumber,
    // birthday: UserData?.birthday,
    gender: UserData?.gender?UserData.gender:"male",

    streetAddress: UserData.streetAddress,
    zipCode: UserData?.zipCode,
    city: UserData.city,
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
    console.log("api data",data)
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

        <RHFTextField name="emailAddress" label="Email Address" InputProps={{ readOnly: true }}/>

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

        <RHFSelect native name="gender" label="Gender">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>
      </Box>
     
      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Billing Address </Typography>

        <Stack spacing={2.5}>
          <RHFTextField name="streetAddress" label="Street Address" />

          <RHFTextField name="zipCode" label="Zip Code" />

          <RHFTextField name="city" label="City" />

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </FormProvider>
  );
}
