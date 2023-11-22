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

export default function EcommerceLegalTerms() {
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
          <Typography variant="h2">Terms of use</Typography>

          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            Please read these terms of use carefully before using Ms. Bells Creations website
            operated by us.
          </Typography>
        </Grid>
        <Container sx={{ pt: { sx: 4, md: 8 } }}>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Conditions of use</Typography>
            <Typography>
              By using this website, you certify that you have read and reviewed this Agreement and
              that you agree to comply with its terms. If you do not want to be bound by the terms
              of this Agreement, you are advised to leave the website accordingly. Ms. Bells
              Creations only grants use and access of this website, its products, and its services
              to those who have accepted its terms.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Privacy policy</Typography>
            <Typography>
              Before you continue using our website, we advise you to read our privacy policy [link
              to privacy policy] regarding our user data collection. It will help you better
              understand our practices.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography>Age restriction</Typography>
            <Typography>
              You must be at least 18 (eighteen) years of age before you can use this website. By
              using this website, you warrant that you are at least 18 years of age and you may
              legally adhere to this Agreement. Ms. Bells Creations assumes no responsibility for
              liabilities related to age misrepresentation.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Intellectual property</Typography>
            <Typography>
              You agree that all materials, products, and services provided on this website are the
              property of Ms. Bells Creations, its affiliates, directors, officers, employees,
              agents, suppliers, or licensors including all copyrights, trade secrets, trademarks,
              patents, and other intellectual property. You also agree that you will not reproduce
              or redistribute Ms. Bells Creations’ intellectual property in any way, including
              electronic, digital, or new trademark registrations. <br />
              <br />
              You grant Ms. Bells Creations a royalty-free and non-exclusive license to display,
              use, copy, transmit, and broadcast the content you upload and publish. For issues
              regarding intellectual property claims, you should contact the company in order to
              come to an agreement.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">User accounts</Typography>
            <Typography>
              As a user of this website, you may be asked to register with us and provide private
              information. You are responsible for ensuring the accuracy of this information, and
              you are responsible for maintaining the safety and security of your identifying
              information. You are also responsible for all activities that occur under your account
              or password.
              <br />
              <br />
              If you think there are any possible issues regarding the security of your account on
              the website, inform us immediately so we may address it accordingly.
              <br />
              <br />
              We reserve all rights to terminate accounts, edit or remove content and cancel orders
              in their sole discretion.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Applicable law</Typography>
            <Typography>
              By visiting this website, you agree that the laws of the United States without regard
              to principles of conflict laws, will govern these terms and conditions, or any dispute
              of any sort that might come between Ms. Bells Creations and you, or its business
              partners and associates.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Disputes</Typography>
            <Typography>
              Any dispute related in any way to your visit to this website or to products you
              purchase from us shall be arbitrated by state or federal court in Texas and you
              consent to exclusive jurisdiction and venue of such courts.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Indemnification</Typography>
            <Typography>
              You agree to indemnify Ms. Bells Creations and its affiliates and hold Ms. Bells
              Creations harmless against legal claims and demands that may arise from your use or
              misuse of our services. We reserve the right to select our own legal counsel.{' '}
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Typography variant="h4">Limitation on liability</Typography>
            <Typography>
              Ms. Bells Creations is not liable for any damages that may occur to you as a result of
              your misuse of our website.
              <br />
              <br />
              Ms. Bells Creations reserves the right to edit, modify, and change this Agreement any
              time. We shall let our users know of these changes through electronic mail. This
              Agreement is an understanding between Ms. Bells Creations and the user, and this
              supersedes and replaces all prior agreements regarding the use of this website.
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
