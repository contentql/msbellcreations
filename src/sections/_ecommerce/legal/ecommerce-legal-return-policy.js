'use client';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CountUp from 'src/components/count-up';
import { useResponsive } from 'src/hooks/use-responsive';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SUMMARY = [
  { title: 'Years of experience', total: 12, icon: 'carbon:increase-level' },
  { title: 'Awards', total: 20, icon: 'carbon:trophy' },
  { title: 'Projects', total: 150, icon: 'carbon:data-vis-4' },
  { title: 'Happy clients', total: 32000, icon: 'carbon:user-certification' },
];

// ----------------------------------------------------------------------

const StyledIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => ({
  width: 160,
  height: 160,
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  color: theme.palette[color].darker,
  border: `dashed 2px ${alpha(theme.palette[color].main, 0.24)}`,
  '&:before': {
    zIndex: 8,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    background: `conic-gradient(from 0deg at 50% 50%, ${theme.palette[color].main} 0deg, ${theme.palette[color].light} 360deg)`,
  },
  '& svg': {
    zIndex: 9,
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceLegalReturnPolicy() {
  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: 10,
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={6} lg={5}>
          <Image alt="teams" src="/assets/illustrations/illustration_teams.svg" />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={6}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Shipping & Return Policy</Typography>

          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            Thank you for visiting and shopping at Ms. Bells Creations. The following are the terms
            and conditions that constitute our Shipping Policy.
          </Typography>
        </Grid>
        <Container sx={{ pt: { sx: 4, md: 8 } }}>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h3">Domestic/International Shipping Policy: </Typography>
            <Typography variant="h4">Shipment processing time </Typography>
            <Typography>
              Ms. Bells Creations is not responsible for any customs and taxes applied to your
              order. All fees imposed during or after shipping are the responsibility of the
              customer (tariffs, taxes, etc.).
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Customs, Duties and Taxes </Typography>
            <Typography>
              Before you continue using our website, we advise you to read our privacy policy [link
              to privacy policy] regarding our user data collection. It will help you better
              understand our practices.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Damages </Typography>
            <Typography>
              Ms. Bells Creations is not liable for any products damaged or lost during shipping. If
              you received your order damaged, please contact the shipment carrier to file a claim.
              <br />
              <br />
              Please save all packaging materials and damaged goods before filing a claim.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h3">Returns Policy: </Typography>
            <Typography>
              Thank you for your purchase. However, if you are not completely satisfied with your
              purchase for any reason, you may return it to us for a full refund or an exchange.
              Please see below for more information on our return policy.
            </Typography>
            <Typography variant="h4">RETURNS </Typography>
            <Typography>
              All returns must be postmarked within 30 days of the purchase date. All returned items
              must be in new and unused condition, with all original tags and labels attached.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">RETURN PROCESS </Typography>
            <Typography>
              To return an item,please email customer service at msbell@msbellscreations.com to
              obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA
              number,place the item securely in its original packaging and [include your proof of
              purchase / the return form provided / other], and we will provide further shipping
              details.
              <br />
              <br />
              Unless damaged you will be responsible for all return shipping charges. If damaged
              product all return shipping will be paid or reimbursed by us.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">REFUNDS </Typography>
            <Typography>
              After receiving your return and inspecting the condition of your item, we will process
              your return. Please allow at least 5-7 days from the receipt of your item to process
              your return. Refunds may take 1-2 billing cycles to appear on your credit card
              statement, depending on your credit card company. We will notify you by email when
              your return has been processed.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">EXCEPTIONS </Typography>
            <Typography>The following items cannot be returned or exchanged:</Typography>
            <Typography variant="h6" sx={{ px: 2 }}>
              Opened Product{' '}
            </Typography>
            <Typography>
              For defective or damaged products, please contact us to arrange a refund or exchange.{' '}
            </Typography>
          </Stack>
        </Container>
      </Grid>
      {/* 
      <Box
        sx={{
          mt: 10,
          textAlign: 'center',
          display: 'grid',
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value, index) => (
          <div key={value.title}>
            <StyledIcon color={COLORS[index]}>
              <Iconify icon={value.icon} width={48} />
            </StyledIcon>

            <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue) => fShortenNumber(newValue)}
              />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>{value.title}</Typography>
          </div>
        ))}
      </Box> */}
    </Container>
  );
}
