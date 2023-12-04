// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
// import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { HEADER } from '../config-layout';

import HeaderShadow from './header-shadow';
// import SettingsButton from './settings-button';

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  const theme = useTheme();
  const router = useRouter();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Logo />

        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="carbon:chevron-left" />}
            onClick={() => router.push('/')}
          >
            Home Page
          </Button>
        </Stack>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}