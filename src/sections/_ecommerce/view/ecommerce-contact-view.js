'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import EcommerceContactForm from '../contact/ecommerce-contact-form';
import EcommerceContactInfo from '../contact/ecommerce-contact-info';
// ----------------------------------------------------------------------

export default function EcommerceContactView() {
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 5, md: 3 }}
        justifyContent="space-between"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        <Grid xs={12} md={6} lg={5}>
          <EcommerceContactInfo />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Thank you for reaching out to Ms. Bell.
          </Typography>

          <EcommerceContactForm />
        </Grid>
      </Grid>
    </Container>
  );
}
