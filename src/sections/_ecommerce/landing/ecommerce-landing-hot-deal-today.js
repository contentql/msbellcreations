import { add } from 'date-fns';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import ProductCountdownBlock from '../common/product-countdown-block';
import EcommerceProductItemHot from '../product/item/ecommerce-product-item-hot';

// ----------------------------------------------------------------------

export default function EcommerceLandingHotDealToday({ Hotdeals }) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    dots: !mdUp,
    slidesToShow: Hotdeals?.length > 6 ? 6 : Hotdeals?.length,
    slidesToScroll: 6,
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
    responsive: [
      {
        // Down md
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        // Down sm
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  });

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          🔥 Hot Deal Today
        </Typography>

        <ProductCountdownBlock
          hiddenLabel
          expired={add(new Date(), { hours: 1, minutes: 30 })}
          sx={{
            '& .value': {
              width: 36,
              height: 32,
              color: 'grey.800',
              bgcolor: 'text.primary',
              ...(theme.palette.mode === 'light' && {
                color: 'common.white',
              }),
            },
            '& .separator': { color: 'text.primary' },
          }}
        />

        {mdUp && (
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            flexGrow={1}
            spacing={2}
            justifyContent="flex-end"
          />
        )}
      </Stack>

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {Hotdeals?.map((product) => (
          <Box
            key={product.id}
            sx={{
              py: 0.5,
              px: { xs: 1, md: 1.5 },
            }}
          >
            <EcommerceProductItemHot product={product} hotProduct />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
EcommerceLandingHotDealToday.propTypes = {
  Hotdeals: PropTypes.array,
};
