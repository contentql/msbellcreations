import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'All',
    icon: '/assets/icons/ecommerce/ic_men_clothes.svg',
    path: '#',
  },
  {
    label: 'Slave',
    icon: '/assets/icons/ecommerce/ic_men_clothes.svg',
    path: '#',
  },
  {
    label: 'Bar',
    icon: '/assets/icons/ecommerce/ic_women_clothes.svg',
    path: '#',
  },
  {
    label: 'Soap',
    icon: '/assets/icons/ecommerce/ic_watches.svg',
    path: '#',
  },
  {
    label: 'Spray',
    icon: '/assets/icons/ecommerce/ic_home_appliances.svg',
    path: '#',
  },
  {
    label: 'Blend',
    icon: '/assets/icons/ecommerce/ic_sport.svg',
    path: '#',
  },
  {
    label: 'Streamers',
    icon: '/assets/icons/ecommerce/ic_book.svg',
    path: '#',
  },
  {
    label: 'inhaler',
    icon: '/assets/icons/ecommerce/ic_home_living.svg',
    path: '#',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceLandingCategories() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Categories
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {CATEGORIES.map((category) => (
          <Stack
            key={category.label}
            alignItems="center"
            justifyContent="center"
            sx={{
              px: 1,
              py: 3,
              borderRadius: 2,
              cursor: 'pointer',
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
              '&:hover': {
                boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
              },
            }}
          >
            <Link component={RouterLink} href={`${paths.eCommerce.products}/`}>
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'background.neutral',
                  borderRadius: '50%',
                }}
              >
                <Image src={category.icon} sx={{ width: 40, height: 40 }} />
              </Box>
            </Link>
            <TextMaxLine variant="subtitle2" line={1}>
              {category.label}
            </TextMaxLine>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
