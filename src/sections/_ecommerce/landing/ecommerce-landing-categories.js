import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useProducts } from 'src/app/products-store';
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
  const { data } = useQuery(['categories'], () =>
    fetch(process.env.NEXT_PUBLIC_URL+"api/categories?populate=*", {
      method: 'GET',
    }).then((res) => res.json())
  );

  console.log('categories', data?.data);

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
        {data?.data.map((category) => (
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
                  // mb: 2,
                  // p: 1.5,
                  // bgcolor: 'background.neutral',
                  // borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image src={category.icon.url} sx={{ objectFit: 'cover', width: '20%', height: '20%' }} />
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
