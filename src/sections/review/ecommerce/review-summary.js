import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/format-number';

import ReviewProgress from '../common/review-progress';
import { useUserStore } from 'src/app/auth-store';

// ----------------------------------------------------------------------

export default function ReviewSummary({ review, reviewNumber, ratingNumber, onOpenForm }) {
  const { UserData } = useUserStore();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={4}>
            <Typography variant="h3">Reviews</Typography>

            <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="h2"> {ratingNumber}</Typography>

              <Stack spacing={0.5}>
               { <Rating value={ratingNumber} readOnly precision={0.1} />}
                <Typography variant="body2">{fShortenNumber(reviewNumber)} reviews</Typography>
              </Stack>
            </Stack>

            
          </Grid>

          {/* <Grid xs={12} md={4}>
  <ReviewProgress review={review}/>
</Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

ReviewSummary.propTypes = {
  onOpenForm: PropTypes.func,
  ratingNumber: PropTypes.number,
  reviewNumber: PropTypes.number,
};
