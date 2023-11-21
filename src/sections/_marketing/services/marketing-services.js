import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const LISTS = [
  'What User Data We Collect?',
  'Why We Collect Your Data?',
  'Safeguarding and Securing the Data.',
  'Our Cookie Policy.',
  'Links to Other Websites.',
  'Restricting the Collection of your Personal Data.',
];

const CollectedData = [
  'Your IP address.',
  'Your contact information and email address.',
  'Other information such as interests and preferences.',
  'Data profile regarding your online behavior on our website.',
];

const WhyCollectedData = [
  'To better understand your needs.',
  'To improve our services and products.',
  'To send you promotional emails containing the information we think you will find interesting.',
  'To contact you to fill out surveys and participate in other types of market research.',
  'To customize our website according to your online behavior and personal preferences.',
];
// ----------------------------------------------------------------------

export default function MarketingServices() {
  return (
    <Container
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={6} lg={5}>
          <Image alt="services" src="/assets/illustrations/illustration_services.svg" />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Stack spacing={3} sx={{ mb: 5 }}>
            <Typography variant="h2">Privacy policy</Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              This privacy policy will help you understand how Ms. Bells Creations uses and protects
              the data you provide to us when you visit and use www.msbellscreations.com website. If
              you want to make sure that you are up to date with the latest changes, we advise you
              to frequently visit this page.
            </Typography>

            <Stack spacing={2} sx={{ fontWeight: 'bold' }}>
              {LISTS.map((text) => (
                <Stack key={text} direction="row" alignItems="center">
                  <Box
                    component="span"
                    sx={{
                      mr: 2,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                  {text}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Container sx={{ pt: 8 }}>
        <Stack spacing={2} sx={{ pb: 2 }}>
          <Typography variant="h4">What User Data We Collect</Typography>
          <Typography>When you visit the website, we may collect the following data:</Typography>
          <Stack spacing={2}>
            {CollectedData.map((text) => (
              <Stack key={text} direction="row" alignItems="center">
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                {text}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ pb: 2 }}>
          <Typography spacing={2} variant="h4">
            Why We Collect Your Data
          </Typography>
          <Typography>We are collecting your data for several reasons:</Typography>
          <Stack spacing={2}>
            {WhyCollectedData.map((text) => (
              <Stack key={text} direction="row" alignItems="center">
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                {text}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ pb: 2 }}>
          <Typography variant="h4">Safeguarding and Securing the Data</Typography>
          <Typography>
            Ms. Bells Creations is committed to securing your data and keeping it confidential. Ms.
            Bells Creations has done all in its power to prevent data theft, unauthorized access,
            and disclosure by implementing the latest technologies and software, which help us
            safeguard all the information we collect online.
          </Typography>
          <Typography variant="h4">Our Cookie Policy</Typography>
          <Typography>
            Once you agree to allow our website to use cookies, you also agree to use the data it
            collects regarding your online behavior (analyze web traffic, web pages you spend the
            most time on, and websites you visit).
          </Typography>
          <Typography>
            The data we collect by using cookies is used to customize our website to your needs.
            After we use the data for statistical analysis, the data is completely removed from our
            systems.
          </Typography>
          <Typography>
            Please note that cookies dont allow us to gain control of your computer in any way. They
            are strictly used to monitor which pages you find useful and which you do not so that we
            can provide a better experience for you
          </Typography>
          <Typography>
            If you want to disable cookies, you can do it by accessing the settings of your internet
            browser. You can visit www.internetcookies.com, which contains comprehensive information
            on how to do this on a wide variety of browsers and devices.
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ pb: 2 }}>
          <Typography variant="h4">Links to Other Websites</Typography>
          <Typography>
            Our website contains links that lead to other websites. If you click on these links Ms.
            Bells Creations is not held responsible for your data and privacy protection. Visiting
            those websites is not governed by this privacy policy agreement. Make sure to read the
            privacy policy documentation of the website you go to from our website.
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ pb: 2 }}>
          <Typography variant="h4">Restricting the Collection of your Personal Data</Typography>
          <Typography>
            At some point, you might wish to restrict the use and collection of your personal data.
            You can achieve this by doing the following:
          </Typography>
          <Typography>
            When you are filling the forms on the website, make sure to check if there is a box
            which you can leave unchecked, if you don t want to disclose your personal information.
          </Typography>
          <Typography>
            If you have already agreed to share your information with us, feel free to contact us
            via email and we will be more than happy to change this for you.
          </Typography>
          <Typography>
            Ms. Bells Creations will not lease, sell or distribute your personal information to any
            third parties, unless we have your permission. We might do so if the law forces us. Your
            personal information will be used when we need to send you promotional materials if you
            agree to this privacy policy.
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
}
