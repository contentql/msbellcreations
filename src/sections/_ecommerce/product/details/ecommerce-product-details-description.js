import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Markdown from 'src/components/markdown';


// ----------------------------------------------------------------------

export default function EcommerceProductDetailsDescription({ description,ingredients,howtouse, specifications }) {

  
  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      {/* <Stack spacing={2}>
        <Typography variant="h6"> Specifications </Typography>

        {specifications.map((row) => (
          <Stack
            key={row.label}
            spacing={0.5}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            sx={{ typography: 'body2' }}
          >
            <Box component="span" sx={{ width: 160, color: 'text.secondary' }}>
              {row.label}
            </Box>
            <Box component="span">{row.value}</Box>
          </Stack>
        ))}
      </Stack> */}

      <Stack spacing={2}>
        <Typography variant="h6"> Description </Typography>
        <Markdown content={description} />
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6"> How to use </Typography>
        <Markdown content={howtouse} />
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6"> Ingredients </Typography>
        <Markdown content={ingredients} />
      </Stack>
    </Stack>
  );
}

EcommerceProductDetailsDescription.propTypes = {
  description: PropTypes.string,
  specifications: PropTypes.array,
  ingredients: PropTypes.string,
  howtouse: PropTypes.string,
};
