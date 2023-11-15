import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Customer Satisfaction',
    description: 'satisfying customers with natural, holistic solutions for well-being.',
    icon: 'carbon:3d-curve-auto-colon',
  },
  {
    title: 'Transparency',
    description: 'Openness and honesty guide our natural products, ensuring your well-being.',
    icon: 'carbon:chat-bot',
  },
  {
    title: 'Reputation',
    description: 'ATrusted for quality, Ms. Bells Creations upholds a strong, reliable reputation.',
    icon: 'carbon:airport-location',
  },
  {
    title: 'Cooperation',
    description: 'Collaboration empowers us, achieving shared goals through unity and teamwork.',
    icon: 'carbon:event',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceAboutCoreValues() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 15 },
      }}
    >
      <Container>
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 15 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Core Values</Typography>

          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 540 } }}>
            The core values revolve around embracing time-tested remedies, promoting a holistic
            lifestyle with natural ingredients, and fostering a sense of community by providing
            relief and trustworthy products to families. Ms. Bells Creations strives to make
            individuals feel at home again, offering a sanctuary of well-being in the midst of busy
            lifestyles.
          </Typography>
        </Stack>

        <Grid container spacing={8}>
          {CORE_VALUES.map((value) => (
            <Grid
              key={value.title}
              xs={12}
              sm={6}
              md={3}
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Iconify icon={value.icon} width={48} sx={{ color: 'primary.main' }} />

              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                {value.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
