import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useUserStore } from 'src/app/auth-store';
import { RouterLink } from 'src/routes/components';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from '../config-layout';
import { useCart } from '../../app/store';
import Searchbar from '../common/searchbar';
import { useWish } from '../../app/wishstore';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {

  const router = useRouter();
  const { cartItems, cartempty } = useCart();
  const { wishItems, wishempty } = useWish();
  const { UserData, removeUserData } = useUserStore();
  const theme = useTheme();

  const logout = () => {
    router.push('/');
    removeUserData();
    wishempty();
    cartempty();
  };

  const { data } = useQuery(['products'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/products?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigations = [
    {
      title: 'Personal Info',
      path: paths.eCommerce.account.personal,
      icon: <Iconify icon="carbon:user" />,
    },
    {
      title: 'Wishlist',
      path: paths.eCommerce.account.wishlist,
      icon: <Iconify icon="carbon:favorite" />,
    },
    // {
    //   title: 'Vouchers',
    //   path: paths.eCommerce.account.vouchers,
    //   icon: <Iconify icon="carbon:cut-out" />,
    // },
    {
      title: 'Orders',
      path: paths.eCommerce.account.orders,
      icon: <Iconify icon="carbon:document" />,
    },
    // {
    //   title: 'Payment',
    //   path: paths.eCommerce.account.payment,
    //   icon: <Iconify icon="carbon:purchase" />,
    // },
  ];

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: {xs: 'right', md:'space-between' }}}
        >
          <Box sx={{ lineHeight: 0, position: {xs:'absolute',md: 'relative'}, width: '15%', left:2, top:-4   }}>
            <Logo />

            {/* <Link href="#">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.1.0
              </Label>
            </Link> */}
          </Box>

          {mdUp && <NavDesktop products={data?.data} data={navConfig} />}

          <Stack spacing={{xs:2,md:4}} direction="row" alignItems="center" justifyContent="flex-end">
            <Badge badgeContent={wishItems.length} color="info">
              <IconButton
                component={RouterLink}
                href={paths.eCommerce.wishlist}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:favorite" width={24} />
              </IconButton>
            </Badge>
            <Badge badgeContent={cartItems.length} color="error">
              <IconButton
                component={RouterLink}
                href={paths.eCommerce.cart}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:shopping-cart" width={24} />
              </IconButton>
            </Badge>

            {mdUp && (UserData.isLoggedIn  ? 
          (<>
            <Tooltip title="Account settings">
              <Avatar
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                alt="User"
                src={UserData.avatar}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
              />
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  padding: 2,
                  width: 300,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Link
                sx={{ color: 'black' }}
                component={RouterLink}
                href={paths.eCommerce.account.personal}
                underline="none"
              >
                <MenuItem onClick={handleClose}>
                  <Avatar src={UserData.avatar} />
                  {UserData.username}
                </MenuItem>
              </Link>
              <Divider sx={{ my: 1 }} />
              {navigations.map(({ title, path, icon }, id) => {
               

                return (
                  <Link
                    key={id} // Adding a key prop to the Link component
                    sx={{ color: 'black' }}
                    component={RouterLink}
                    href={path} // Use "to" instead of "href" for React Router Links
                    underline="none"
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ mr: 0 }}>{icon}</ListItemIcon>
                      {title}
                    </MenuItem>
                  </Link>
                );
              })}

              <Divider sx={{ my: 1 }} />
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push('/');
                  removeUserData();
                  wishempty();
                  cartempty();
                }}
              >
                <ListItemIcon sx={{ mr: 0 }}>
                  <Iconify icon="material-symbols:logout" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>)
             : (
              <>
                <Link component={RouterLink} href={paths.loginBackground}>
                  <Button variant="contained" color="inherit">
                    Login
                  </Button>
                </Link>
              </>
            ))}

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
