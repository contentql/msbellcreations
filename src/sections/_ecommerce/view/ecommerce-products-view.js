'use client';

import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { _products } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { CATEGORIES } from 'src/_mock/_products';
import { useBoolean } from 'src/hooks/use-boolean';
import { useProducts } from 'src/app/products-store';

import EcommerceFilters from '../product/filters/ecommerce-filters';
import EcommerceProductList from '../product/list/ecommerce-product-list';
import EcommerceProductListBestSellers from '../product/list/ecommerce-product-list-best-sellers';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductsView() {
  const { prod, Productsadd } = useProducts();

  const { data } = useQuery(['products'], () =>
    fetch(process.env.NEXT_PUBLIC_PODUCTS_API, {
      method: 'GET',
    }).then((res) => res.json())
  );
 
  const { data: category } = useQuery(['categories'], () =>
    fetch(process.env.NEXT_PUBLIC_CATEGORIES_API, {
      method: 'GET',
    }).then((res) => res.json())
  );

  console.log('categorys', category);
  const mobileOpen = useBoolean();
  const Bestsellers=data?.data.sort((a,b)=>b.sold-a.sold).slice(0,4)
  console.log("best",Bestsellers)
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    filterCategories: searchParams.get('category') ? [searchParams.get('category')] : [],
    filterPrice: {
      start: searchParams.get('startPrice') ? searchParams.get('startPrice') : 0,
      end: searchParams.get('endPrice') ? searchParams.get('endPrice') : 0,
    },
  });

  console.log('products:', filters.filterCategories);

  const [sort, setSort] = useState('latest');

  const loading = useBoolean(true);

  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
  }, []);

  console.log('Filters', filters);
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h3">Catalog</Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: 'none' },
          }}
        >
          Filters
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: 'column-reverse',
          md: 'row',
        }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <EcommerceFilters
            filters={filters}
            setFilters={setFilters}
            categories={category?.data}
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
          />
          <EcommerceProductListBestSellers products={Bestsellers} />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={viewMode}
              onChange={handleChangeViewMode}
              sx={{ borderColor: 'transparent' }}
            >
              {VIEW_OPTIONS.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                  {option.icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
              <Select value={sort} onChange={handleChangeSort}>
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Stack>

          <EcommerceProductList
            loading={loading.value}
            viewMode={viewMode}
            filter={filters}
            products={data?.data}
          />
        </Box>
      </Stack>
    </Container>
  );
}
