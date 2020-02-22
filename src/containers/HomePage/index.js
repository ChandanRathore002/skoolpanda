import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <div className="demo"/>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    isAuthVerified: state.auth.isAuthVerified,
    isLoading: state.auth.isLoading
  };
}

export default connect(mapStateToProps)(HomePage);
