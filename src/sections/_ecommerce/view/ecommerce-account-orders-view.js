'use client';

import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { _productsTable } from 'src/_mock';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useUserStore } from 'src/app/auth-store';
import { stableSort, getComparator } from '../account/utils';
import EcommerceAccountOrdersTableRow from '../account/ecommerce-account-orders-table-row';
import EcommerceAccountOrdersTableHead from '../account/ecommerce-account-orders-table-head';
import EcommerceAccountOrdersTableToolbar from '../account/ecommerce-account-orders-table-toolbar';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Link from 'next/link'

// ----------------------------------------------------------------------


export const TABLE_HEAD = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'item', label: 'Item' },
  { id: 'Order date', label: 'Order Date', width: 160 },
  { id: 'price', label: 'Price', width: 100 },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {

  const { UserData } = useUserStore();

  const [tab, setTab] = useState('All Orders');

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('id');

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data } = useQuery(['orders'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders?populate=*`,{
      method: 'GET',
    }).then((res) => res.json())
  );
  const _pr=data?.data

  //console.log("pr data",_pr)
 const filtered_data=_pr?.filter((state)=>state.emailAddress===UserData.email);
//console.log("user data order",filtered_data)
  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  const handleSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllRows = useCallback((event) => {
    if (event.target.checked) {
      const newSelected = _productsTable?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, []);

  const handleSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event) => {
    setDense(event.target.checked);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered_data.length) : 0;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Orders
      </Typography>

      {/* <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs> */}

      {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 5, mb: 3 }}>
        <TextField
          fullWidth
          hiddenLabel
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="center">
          <DatePicker label="Start Date" sx={{ width: 1, minWidth: 180 }} />
          <DatePicker label="End Date" sx={{ width: 1, minWidth: 180 }} />
        </Stack>
      </Stack> */}

    {filtered_data?.length!==0?<TableContainer
      sx={{
        overflow: 'unset',
        [`& .${tableCellClasses.head}`]: {
          color: 'text.primary',
        },
        [`& .${tableCellClasses.root}`]: {
          bgcolor: 'background.default',
          borderBottomColor: (theme) => theme.palette.divider,
        },
      }}
    >
      <EcommerceAccountOrdersTableToolbar
        rowCount={filtered_data?.length}
        numSelected={selected.length}
        onSelectAllRows={handleSelectAllRows}
      />

      <Scrollbar>
        <Table
          sx={{
            minWidth: 720,
          }}
          size={dense ? 'small' : 'medium'}
        >
          <EcommerceAccountOrdersTableHead
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
            headCells={TABLE_HEAD}
            rowCount={filtered_data?.length}
            numSelected={selected.length}
            onSelectAllRows={handleSelectAllRows}
          />

          <TableBody>
            {filtered_data && stableSort(filtered_data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <EcommerceAccountOrdersTableRow
                  key={row.id}
                  row={row}
                  selected={selected.includes(row.id)}
                  onSelectRow={() => handleSelectRow(row.id)}
                />
                // console.log("row data",row)
              ))}

            {emptyRows > 0 && (
              <TableRow
                sx={{
                  height: (dense ? 36 : 57) * emptyRows,
                }}
              >
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>:
        <Stack alignItems="center" justifyContent="center" sx={{ display: 'flex' }}>
          <Typography
            variant="body2"
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ typography: 'h6', display: 'flex' }}
          >
            <Image src="/assets/images/empty-state/empty-wishlist.png" />
          </Typography>
          <Link href={paths.eCommerce.products} sx={{ typography: 'h6', mt: 10 }}>
            Go to products page
          </Link>
        </Stack>
}

      <Box sx={{ position: 'relative', mt:15}}>
        <TablePagination
          page={page}
          component="div"
          count={filtered_data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          
        /> 

        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        /> */}
      </Box>
    </>
  );
}
