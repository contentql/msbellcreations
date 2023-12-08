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

// ----------------------------------------------------------------------

export default function EcommercePostsView() {

  const { data:blogs } = useQuery(['blogs'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );


 
  return (
<Container sx={{mb:{xs:"50px",md:"150px"}}}>
      {/* <PostSearchMobile /> */}
      <BlogMarketingFeaturedPosts posts={blogs?.data.slice(0,5)} />
      <Container
        sx={{
          mt: 10,
        }}
      >
        
          <Grid xs={12} md={8}>
            <BlogMarketingPosts posts={blogs?.data} />
          </Grid>

          {/* <Grid xs={12} md={4}>
            <PostSidebar
              popularTags={_tags}
              categories={_categories}
              recentPosts={{ list: _marketingPosts.slice(-4) }}
              advertisement={{
                title: 'Advertisement',
                description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                imageUrl: _mock.image.marketing(9),
                path: '',
              }}
            />
          </Grid> */}
      </Container>
      </Container>
  );
}
