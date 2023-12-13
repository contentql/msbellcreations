import { useEffect } from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';

import { NAV } from '../../../config-layout';

import NavList from './nav-list';
import { useUserStore } from 'src/app/auth-store';

import Avatar from '@mui/material/Avatar';

// ----------------------------------------------------------------------

export default function NavMobile({ data }) {
  const {UserData}=useUserStore()
  const pathname = usePathname();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>
          <Logo />
          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          {UserData.isLoggedIn ?

                <Link component={RouterLink}
                href={paths.eCommerce.account.personal}>
                <Button variant="contained" color="inherit" sx={{width:"80%",ml:3.5 }}>
                  Profile
                </Button>
                </Link>
              
              : <Link component={RouterLink} href={paths.loginBackground}>
                <Button variant="contained" color="inherit" sx={{width:"80%",ml:3.5 }}>
                  Login
                </Button>
              </Link>}
          </List>

          {/* <Stack spacing={1.5} sx={{ p: 3 }}>
            <Button fullWidth variant="contained" color="inherit">
              Buy Now
            </Button>
          </Stack> */}
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
