import { unwrapResult } from '@reduxjs/toolkit';
import productApi from 'api/productApi';
import { getMe } from 'app/userSlice';
import SignIn from 'features/Auth/pages/SignIn';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Button } from 'reactstrap';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };

        const response = await productApi.getAll(params);

        setProductList(response.data);
      } catch (error) {
        console.log('failed to fetch product list', error);
      }
    };

    fetchProductList();
  }, []);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs put, handle smt here
          console.log('User is not logged in');
          return;
        }

        setUserName(user.displayName);
        // const token = await user.getIdToken();
        // console.log('Logged in user token:', token);
        const userProviderData = JSON.stringify(user.providerData);
        localStorage.setItem(
          'firebaseui::rememberedAccounts',
          userProviderData
        );

        // Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log('Logged in user:', currentUser);
          // console.log('actionResult:', actionResult);
        } catch (error) {
          console.log('Failed to login', error.message);
          // show toast error
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleButtonClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const response = await productApi.getAll(params);
      console.log(response);
    } catch (error) {
      console.log('failed to fetch product list', error);
    }
  };

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header userName={userName} />

          <Button onClick={handleButtonClick}>Fetch Product List</Button>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
