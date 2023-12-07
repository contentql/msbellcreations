'use client';

import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import AccountLayout from 'src/layouts/account';

// ----------------------------------------------------------------------

export default function Template({ children }) {
  return <MainLayout><AccountLayout>{children}</AccountLayout></MainLayout>;
}

Template.propTypes = {
  children: PropTypes.node,
};
