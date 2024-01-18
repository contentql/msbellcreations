import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import ReviewProgressItem from './review-progress-item';

const RATINGS = ['5start', '4start', '3start', '2start', '1start'];

export default function ReviewProgress({ review, ...other }) {
  const [ratingCounts, setRatingCounts] = useState({
    '5start': 0,
    '4start': 0,
    '3start': 0,
    '2start': 0,
    '1start': 0,
  });

  useEffect(() => {
    // Initialize counts with the default values
    const counts = RATINGS.reduce((acc, rating) => {
      return { ...acc, [rating]: 0 };
    }, {});

    // Update counts based on the current review
    review.forEach((item) => {
      const rating = `${item.rating}start`;
      counts[rating] += 1;
    });

    // Update the state with the new counts
    setRatingCounts(counts);
  }, [review]);

  const totals = RATINGS.reduce((acc, rating) => acc + ratingCounts[rating], 0);

  return (
    <RadioGroup>
      <Stack spacing={2} {...other}>
        {RATINGS.map((rating, index) => (
          <ReviewProgressItem key={rating} rating={{ value: rating, number: ratingCounts[rating] }} index={index} totals={totals} />
        ))}
      </Stack>
    </RadioGroup>
  );
}
