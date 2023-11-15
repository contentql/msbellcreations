import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function EcommerceAboutHero() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 10 },
        overflow: 'hidden',
        bgcolor: 'primary.lighter',
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 8, md: 3 }} justifyContent="space-between">
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              color: 'grey.800',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h1">Our Story</Typography>

            <Typography sx={{ mt: 3, mb: 6 }}>
              Nora started this way of living when she had her first child in 1986 and she found a
              reason to follow her grandmother’s homeopathic remedies from her childhood. Ever since
              then she has been supplying family and friends with healthy, chemical free solutions
              to their everyday needs.
            </Typography>
            <Typography>
              In 2022, Nora decided to launch Ms. Bells Creations with the help of her daughter in
              law, Lindsey. They both posses a passion of bringing natural products into the homes
              of people everywhere.
            </Typography>
          </Grid>

          <Grid xs={12} md={6} lg={6}>
            <Image
              sx={{ borderRadius: 2 }}
              alt="Author-image"
              src="/assets/images/About/Author-image-1.jpg"
            />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: { xs: 5, md: 10 } }}>
        <Grid container spacing={{ xs: 8, md: 3 }} justifyContent="space-between">
          <Grid xs={12} md={6} lg={6}>
            <Image
              sx={{ borderRadius: 2 }}
              alt="Author-image"
              src="/assets/images/About/Author-image-2.jpg"
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              color: 'grey.800',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography sx={{ mt: 1, mb: 2 }}>
              We often turn to our neighbor and wonder what do they have that will help with our
              pain or anxiety? Our Blends can help provide relief and they are created with natural
              ingredients so that you don’t have worry about harmful products hurting your family.
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
              We want you to feel at home again with our products. Let us provide relief, in your
              busy lifestyles.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
