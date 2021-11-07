import React, { createContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PropTypes } from 'prop-types';
import { login } from '../slices/authSlice';

export const AuthContext = createContext();

const AuthContextProvider = ({ props }) => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);
  const shouldFetchUser = isEmpty(user) && isAuthenticated;
  const appHasUser = !isEmpty(user) && isAuthenticated;

  // useEffect(() => {
  //   if (shouldFetchUser) {
  //     dispatch(login());
  //   }
  // }, [dispatch, shouldFetchUser]);

  const { children } = props;

  return <AuthContext.Provider value={{ currentUser, pending }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AuthContextProvider;
