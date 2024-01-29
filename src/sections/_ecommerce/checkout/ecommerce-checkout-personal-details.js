import { PropTypes } from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFTextField } from 'src/components/hook-form';
import { useUserStore } from 'src/app/auth-store';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPersonalDetails() {
  const { UserData } = useUserStore();
  const { setValue, getValues } = useForm();
  useEffect(() => {
    if (UserData.firstName || UserData.lastName || UserData.phoneNumber) {
      setValue('firstName', UserData.firstName ? UserData.firstName : getValues('firstName'));
      setValue('lastName', UserData.lastName ? UserData.lastName : getValues('lastName'));
      setValue('emailAddress', UserData.email ? UserData.email : getValues('email'));
      setValue('phoneNumber', UserData.phoneNumber ? UserData.phoneNumber : getValues('phoneNumber'));
    }
  }, []);

  const passwordShow = useBoolean();

  return (
    <>
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

        {/* <RHFTextField
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

        <RHFTextField
          name="confirmPassword"
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
        /> */}
      </Box>
    </>
  );
}
