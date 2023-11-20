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
    label: 'Slave',
    icon: '/assets/images/categories/slave.svg',
    path: '#',
  },
  {
    label: 'Bar',
    icon: '/assets/images/categories/bars.svg',
    path: '#',
  },
  {
    label: 'Soap',
    icon: '/assets/images/categories/soap-solid.svg',
    path: '#',
  },
  {
    label: 'Spray',
    icon: '/assets/images/categories/spray.svg',
    path: '#',
  },
  {
    label: 'Blend',
    icon: '/assets/images/categories/blend.svg',
    path: '#',
  },
  {
    label: 'Steamers',
    icon: '/assets/images/categories/steamers.svg',
    path: '#',
  },
  {
    label: 'Inhaler',
    icon: '/assets/images/categories/ihhaler.svg',
    path: '#',
  },
  {
    label: 'all',
    icon: '/assets/images/categories/all.svg',
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
            <Link
              component={RouterLink}
              href={`${paths.eCommerce.products}/?category=${category.label}`}
            >
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'background.neutral',
                  borderRadius: '50%',
                }}
              >
                <Image src={category.icon} sx={{ width: 60, height: 60 }} />
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
