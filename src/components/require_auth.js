import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
export const require_auth = (ComposedComponent) => {
  class Authentication extends Component {
    render() {
      return this.props.authenticated ? (
        <ComposedComponent {...this.props} />
      ) : (
        <Redirect to="/" />
      );
    }
  }
  const mapStateToProps = (state) => {
    return { authenticated: state.authenticated };
  };
  return connect(mapStateToProps)(Authentication);
};
export default require_auth;
