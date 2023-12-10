'use client';

import { useQuery } from 'react-query';

import { Box } from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _tags, _mock, _categories, _marketingPosts } from 'src/_mock';

import PostSidebar from '../../blog/common/post-sidebar';
import PostSearchMobile from '../../blog/common/post-search-mobile';
import BlogMarketingPosts from '../../blog/marketing/marketing-posts';
import BlogMarketingFeaturedPosts from '../../blog/marketing/marketing-featured-posts';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function EcommercePostsView() {
  const { data: blogs, isLoading } = useQuery(['blogs'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container sx={{ mb: { xs: "50px", md: "150px" } }}>
      <PostSearchMobile />
      <BlogMarketingFeaturedPosts posts={blogs?.data} />
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <BlogMarketingPosts posts={blogs?.data} />
          </Grid>
          {/* Other Grid items go here */}
        </Grid>
      </Container>
    </Container>
  );
}