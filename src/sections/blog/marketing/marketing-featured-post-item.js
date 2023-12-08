import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import { fDate } from 'src/utils/format-time';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import PostTimeBlock from '../common/post-time-block';

// ----------------------------------------------------------------------

export default function MarketingFeaturedPostItem({ post }) {
  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ bgcolor: 'background.default', borderRadius: 2 }}
    >
      <Image src={post.coverUrl.url} alt={post.title} sx={{ flexGrow: 1, height: { md: 560 }, maxWidth:{md:560} }} />

      <Stack
        justifyContent="space-between"
        sx={{
          mx: 'auto',
          p: { xs: 3, md: 5 },
          maxWidth: { md: 396 },
        }}
      >
        <Stack spacing={1}>
          <PostTimeBlock createdAt={post?.createdDate?post.createdDate:fDate(post.createdAt)} duration={post.duration} />

          <Link component={RouterLink} href={`${paths.eCommerce.posts}/${post.id}`} color="inherit" variant="h3">
            {post.title}
          </Link>

          <TextMaxLine line={6} variant="body2" sx={{ color: 'text.secondary' }}>
            {post.description}
          </TextMaxLine>
        </Stack>

        {/* <Stack direction="row" alignItems="center" sx={{ pt: 2, typography: 'body2' }}>
          <Avatar src={post.author.avatarUrl} sx={{ mr: 1 }} />
          {post.author.name}
        </Stack> */}
      </Stack>
    </Stack>
  );
}

MarketingFeaturedPostItem.propTypes = {
  post: PropTypes.shape({
    id:PropTypes.string,
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    duration: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    createdDate:PropTypes.instanceOf(Date),
    author: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};
