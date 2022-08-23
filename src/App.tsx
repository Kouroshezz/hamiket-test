import React, { useEffect } from 'react';

// Styles
import './App.css';
import logo from './logo.svg';
// Components
import Layout from './Components/Layout/layout';
import Posts from './Components/Posts/posts';
import { useAppDispatch, useAppSelector } from './Hooks/hooks';
import { login } from './store/Slices/userSlice';
import Cookies from 'js-cookie';


function App() {

  const dispatch = useAppDispatch();
  const userstatus = useAppSelector((state) => state.user.login);

  useEffect(() => {
    dispatch(login(Cookies.get('login')));
  }, [dispatch])

  return (
    <main className="App">
      <Layout>
        <Posts />
      </Layout>
    </main>
  );
}

export default App;
