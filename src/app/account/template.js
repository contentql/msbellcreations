'use client';

import PropTypes from 'prop-types';

import AccountLayout from 'src/layouts/account';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Template({ children }) {
  return <MainLayout><AccountLayout>{children}</AccountLayout></MainLayout>;
}

Template.propTypes = {
  children: PropTypes.node,
};
