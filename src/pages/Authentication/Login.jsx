import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';

const Login = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const { tokenId, profileObj } = googleData;
    console.log(tokenId, profileObj);
    dispatch(login({ tokenId, profileObj }));
    navigate('/');
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

export default Login;
