import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import ReviewItem from './review-item';
import { useState } from 'react';

export default function ReviewList({ reviews }) {
  const itemsPerPage = 6; // Adjust the number of items per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on the reviews length and itemsPerPage
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ pt: 5 }}>
      {reviews.slice(startIndex, endIndex).map((review) => (
        <ReviewItem
          key={review.id}
          name={review.name}
          avatarUrl={review.avatar}
          message={review.review}
          rating={review.rating}
          // helpful={review.helpful}
        />
      ))}

     { reviews.length!==0&&<Pagination
        count={pageCount}
        page={currentPage}
        color="primary"
        onChange={handleChangePage}
        sx={{
          mt: 5,
          mb: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />}
    </Box>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.array,
};
