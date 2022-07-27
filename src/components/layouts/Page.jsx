import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef, Fragment } from 'react';
import { Box, Paper } from '@mui/material';

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <Fragment>
    <Helmet>
      <title>{`${title} | ECP Web`}</title>
      {meta}
    </Helmet>
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </Fragment>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
