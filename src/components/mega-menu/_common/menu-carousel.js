import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import ProductPrice from 'src/sections/_ecommerce/common/product-price';

import Image from '../../image';
import TextMaxLine from '../../text-max-line';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from '../../carousel';

// ----------------------------------------------------------------------

export default function MenuCarousel({ products, numberShow, sx }) {
  const theme = useTheme();
  const carousel = useCarousel({
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    ...CarouselDots({
      sx: { mt: 3 },
    }),
  });

  return (
    <Box sx={{ position: 'relative', pt: 3, ...sx }}>
      <CarouselArrows
        filled
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        leftButtonProps={{
          size: 'small',
          sx: { top: 'calc(50% - 40px)', left: -8 },
        }}
        rightButtonProps={{
          size: 'small',
          sx: { top: 'calc(50% - 40px)', right: -8 },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {products.map((product) => (
            <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
              <Link
                component={RouterLink}
                href={`${paths.eCommerce.products}/${product.id}`}
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  transition: theme.transitions.create('all'),
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Image
                  alt={product.coverUrl}
                  src={product.coverUrl.url}
                  ratio="1/1"
                  disabledEffect
                  sx={{ borderRadius: 1, mb: 1, bgcolor: 'background.neutral' }}
                />

                <TextMaxLine variant="body2" sx={{ color: 'text.main' }}>
                  {product.name}
                </TextMaxLine>
                <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
                  {fCurrency(product.price)}
                </TextMaxLine>
              </Link>
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

MenuCarousel.propTypes = {
  numberShow: PropTypes.number,
  products: PropTypes.array,
  sx: PropTypes.object,
};
