'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { _tours } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';

import TravelNewsletter from '../travel-newsletter';
import TravelFilters from '../filters/travel-filters';
import TravelTourList from '../list/travel-tour-list';

// ----------------------------------------------------------------------

export default function TravelToursView() {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <>
      <Container>
        <TravelFilters
          sx={{
            mt: 5,
            mb: { xs: 5, md: 10 },
          }}
        />

        <TravelTourList tours={_tours} loading={loading.value} />
      </Container>

      <TravelNewsletter />
    </>
  );
}
