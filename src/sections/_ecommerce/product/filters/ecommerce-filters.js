import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { CATEGORIES } from 'src/_mock/_products';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

import FilterTag from './filter-tag';
import FilterPrice from './filter-price';
import FilterBrand from './filter-brand';
import FilterStock from './filter-stock';
import FilterRating from './filter-rating';
import FilterShipping from './filter-shipping';
import FilterCategory from './filter-category';
// ----------------------------------------------------------------------

const BRAND_OPTIONS = ['Apple', 'Samsung', 'Xiaomi', 'Honor'];
const CATEGORY_OPTIONS = CATEGORIES;
const SHIPPING_OPTIONS = ['Fast', 'Saving', 'Free'];

const TAG_OPTIONS = ['Books and Media', 'Pet', 'Electronics', 'Food', 'Automotive and Industrial'];

// ----------------------------------------------------------------------

// const defaultValues = {
//   filterBrand: [BRAND_OPTIONS[1]],
//   filterCategories: '',
//   filterRating: null,
//   filterStock: false,
//   filterShipping: [],
//   filterTag: [],
//   filterPrice: {
//     start: 0,
//     end: 0,
//   },
// };

export default function EcommerceFilters({ filters, setFilters, open, onClose, categories }) {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const filtersParam = searchParams.get('filters');
    if (filtersParam) {
      const decodedFilters = JSON.parse(decodeURIComponent(filtersParam));
      setFilters({
        ...filters,
        filterCategories: decodedFilters,
      });
      
    } 
  }, []);

  // const [filters, setFilters] = useState(defaultValues);

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleChangeCategories = useCallback(
    (name) => {
      const updatedCategories = getSelected(filters.filterCategories, name);
      // Convert the updatedCategories array to a string
      const updatedCategoriesString = encodeURIComponent(JSON.stringify(updatedCategories));
      const params = new URLSearchParams(router.query);
      params.set('filters', updatedCategoriesString);
      // Update the URL with the new filters
      router.push(process.env.NEXT_PUBLIC_FRONTEND_URL + paths.eCommerce.products + '?' + params);

      setFilters({
        ...filters,
        filterCategories: getSelected(filters.filterCategories, name),
      });
    },
    [filters, setFilters, router]
  );


  const handleChangeStartPrice = useCallback(
    (event) => {
      const params = new URLSearchParams(router.query);
      params.set('start', event.target.value);
      router.push(process.env.NEXT_PUBLIC_FRONTEND_URL + paths.eCommerce.products + '?' + params);
      setFilters({
        ...filters,
        filterPrice: {
          ...filters.filterPrice,
          start: Number(event.target.value),
        },
      });
    },
    [filters, setFilters]
  );

  const handleChangeEndPrice = useCallback(
    (event) => {
      setFilters({
        ...filters,
        filterPrice: {
          ...filters.filterPrice,
          end: Number(event.target.value),
        },
      });
    },
    [filters, setFilters]
  );

  // const handleChangeStock = useCallback(
  //   (event) => {
  //     setFilters({
  //       ...filters,
  //       filterStock: event.target.checked,
  //     });
  //   },
  //   [filters]
  // );

  const handleClearAll = useCallback(() => {
    setFilters({
      filterCategories: [],
      filterPrice: {
        start: 0,
        end: 0,
      },
    });
  }, [setFilters]);

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      <Block title="Category">
        <FilterCategory
          filterCategories={filters.filterCategories}
          onChangeCategories={handleChangeCategories}
          options={categories}
          sx={{ mt: 2 }}
        />
      </Block>
      <Block title="Price">
        <FilterPrice
          filterPrice={filters.filterPrice}
          onChangeStartPrice={handleChangeStartPrice}
          onChangeEndPrice={handleChangeEndPrice}
          sx={{ mt: 2 }}
        />
      </Block>

      {/* <Block title="Brand">
        <FilterBrand
          filterBrand={filters.filterBrand}
          onChangeBrand={handleChangeBrand}
          options={BRAND_OPTIONS}
          sx={{ mt: 1 }}
        />
      </Block>

      <Block title="Price">
        <FilterPrice
          filterPrice={filters.filterPrice}
          onChangeStartPrice={handleChangeStartPrice}
          onChangeEndPrice={handleChangeEndPrice}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title="Shipping">
        <FilterShipping
          filterShipping={filters.filterShipping}
          onChangeShipping={handleChangeShipping}
          options={SHIPPING_OPTIONS}
          sx={{ mt: 1 }}
        />
      </Block>

      <Block title="Ratings">
        <FilterRating
          filterRating={filters.filterRating}
          onChangeRating={handleChangeRating}
          sx={{ mt: 2 }}
        />
      </Block>

      <FilterStock filterStock={filters.filterStock} onChangeStock={handleChangeStock} />

      <Block title="Tags">
        <FilterTag
          filterTag={filters.filterTag}
          onChangeTag={handleChangeTag}
          options={TAG_OPTIONS}
          sx={{ mt: 2 }}
        />
      </Block> */}

      <Link component={RouterLink} href={paths.eCommerce.products}>
        <Button
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
          startIcon={<Iconify icon="carbon:trash-can" />}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </Link>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

EcommerceFilters.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  categories: PropTypes.array,
};

// ----------------------------------------------------------------------

function Block({ title, children, ...other }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={contentOpen.onToggle}
        sx={{ width: 1, cursor: 'pointer' }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={contentOpen.value ? 'carbon:subtract' : 'carbon:add'}
          sx={{ color: 'text.secondary' }}
        />
      </Stack>

      <Collapse unmountOnExit in={contentOpen.value} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
