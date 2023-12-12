
import PropTypes from 'prop-types';
import {useRouter} from "next/navigation"

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import { _mock } from 'src/_mock';
import { useCart } from 'src/app/store';
import { paths } from 'src/routes/paths';
import { useWish } from 'src/app/wishstore';
import Iconify from 'src/components/iconify';
import { useActiveLink } from 'src/routes/hooks';
import { useUserStore } from 'src/app/auth-store';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function Nav({ open, onClose }) {

  const {UserData,removeUserData}=useUserStore()
  const { wishempty} =useWish()
  const {cartempty}=useCart()
  const mdUp = useResponsive('up', 'md');
  const router=useRouter();
  const logout= ()=>{
    router.push('/')
  removeUserData();
    wishempty();
    cartempty();
  }

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(mdUp && {
          width: 280,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={UserData.avatar} sx={{ width: 64, height: 64 }} alt="User"/>
         
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {UserData.guest?`guest${UserData.id}`:UserData.userName}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
           {UserData.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item,id) => {
          // if(UserData.guest && id===0) return null;
          return <NavItem key={item.title} item={item} />
})}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
          onClick={logout}
        >
          <ListItemIcon >
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const active = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};
