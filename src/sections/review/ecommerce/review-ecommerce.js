import Container from '@mui/material/Container';

import { _reviews } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';

import ReviewNewForm from '../common/review-new-form';

import ReviewList from './review-list';
import ReviewSummary from './review-summary';

// ----------------------------------------------------------------------

export default function ReviewEcommerce({review,productId}) {
  const formOpen = useBoolean();
  const total =review?.reduce((sum,ele)=>{return sum+=ele.rating},0)

  return (
    <>
      <ReviewSummary review={review} ratingNumber={Number.isNaN(total / review.length) ? 0 : (total / review.length).toFixed(1)}
 reviewNumber={review.length} onOpenForm={formOpen.onTrue} />

      <Container>
        <ReviewList reviews={review} />
      </Container>

      <ReviewNewForm productId={productId} review={review} open={formOpen.value} onClose={formOpen.onFalse} />
    </>
  );
}
