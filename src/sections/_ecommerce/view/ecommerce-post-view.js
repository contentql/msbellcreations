/* eslint-disable react/prop-types */

'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import Markdown from 'src/components/markdown';
import { _socials, _marketingPosts } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostTags from '../../blog/common/post-tags';
import PostAuthor from '../../blog/common/post-author';
import PostSocialsShare from '../../blog/common/post-socials-share';
import BlogMarketingLatestPosts from '../../blog/marketing/marketing-latest-posts';

// ----------------------------------------------------------------------

export default function EcommercePostView({blogId}) {
  const { title, description, duration, createdAt, author, favorited, heroUrl, tags, content } =
    _marketingPosts[0];

  const [favorite, setFavorite] = useState(favorited);

  const [open, setOpen] = useState(null);

  const { data:blogs } = useQuery(['blogs'], () =>
    fetch(process.env.NEXT_PUBLIC_BLOGS_API, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const blog = blogs?.data.filter((product) => product.id.toString() === blogId.toString()).at(0);
  const LatestPosts=blogs?.data.sort((a,b)=>b.createdAt-a.createdAt).slice(0,4)

  console.log("post ",blog)

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  return (
    <>
      <Image alt="hero" src={blog?.coverUrl.url} ratio="21/9" />

      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: paths.eCommerce.posts},
            { name: blog.title },
          ]}
        />
      </Container>

      <Divider />

      <Container>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <Stack
              spacing={3}
              sx={{
                textAlign: 'center',
                pt: { xs: 5, md: 10 },
                pb: 5,
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                {blog.duration}
              </Typography>

              <Typography variant="h2" component="h1">
                {blog.title}
              </Typography>
              <Typography variant="h5">{description}</Typography>
            </Stack>

            <Divider />
            {/* <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ py: 3 }}>
              <Avatar src={author.avatarUrl} sx={{ width: 48, height: 48 }} />

              <Stack spacing={0.5} flexGrow={1}>
                <Typography variant="subtitle2">{author.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {fDate(createdAt, 'dd/MM/yyyy p')}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                  <Iconify icon="carbon:share" />
                </IconButton>

                <Checkbox
                  color="error"
                  checked={favorite}
                  onChange={handleChangeFavorite}
                  icon={<Iconify icon="carbon:favorite" />}
                  checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                />
              </Stack>
            </Stack> */}

            <Divider sx={{ mb: 6 }} />

            <Markdown content={blog.content} firstLetter />

            {tags.length && <PostTags tags={tags} />}

            {/* <PostSocialsShare /> */}

            <Divider sx={{ mt: 8 }} />

            {/* <PostAuthor author={author} /> */}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <BlogMarketingLatestPosts posts={LatestPosts} />
      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {_socials.map((social) => (
          <MenuItem key={social.value} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            Share via {social.label}
          </MenuItem>
        ))}
      </Popover>  
    </>
  );
}

EcommercePostView.propTypes={
  // eslint-disable-next-line react/no-unused-prop-types
  blog: PropTypes.object,
}
