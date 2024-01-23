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
import { useEffect } from 'react';

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
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/categories?sort=rank:asc&populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

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

      <Box gap={{ xs: 3, lg: 5 }} display="flex" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
        {data?.data.map((category) => (
          <Stack
            key={category.label}
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { xs: '150px', md: '190px' },
              margin: '0',
              px: 1,
              py: 5,
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
                  bgcolor: 'background.neutral',
                  borderRadius: '50%',
                  height: '100px',
                  width: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                // sx={{
                //   display: 'flex',
                //   justifyContent: 'center',
                //   alignItems: 'center',
                // }}
                >
                  <Image
                    src={
                      category?.icon === null
                        ? '/assets/images/defalutCategory.png'
                        : category.icon.url
                    }
                    alt={category?.label}
                    sx={{ objectFit: 'contain', height: '50px' }}
                  />
                </Box>
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
