import Footer from "./Components/Footer";
import HomeSlider from "./Components/HomeSlider";
import NavBar from "./Components/NavBar";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import CategoryWrapper from "./Pages/CategoryWrapper";
import ProductPage from "./Pages/ProductPage";
import Login from "./Pages/Login";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./Firebase/firebase-auth";
import { addUser } from './State Management/Features/User/userSlice.js';
import { addStore, setCurrentStore } from './State Management/Features/User/storeSlice.js';
import { Typography } from "@mui/material";
import SellerLogin from "./Pages/SellerLogin";
import { db } from './Firebase/DBConnection.js';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import ProtectiveRoute from "./Components/ProtectiveRoute";
import StorePage from "./Pages/StorePage";


function App() {


  const { user } = useSelector((state) => state.User);
  const { store ,currentStore} = useSelector((state) => state.Store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (user) {
        dispatch(addUser(authUser));
      } else {
        dispatch(addUser(authUser));
      }
    })
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  },[currentStore]);

  useEffect(() => {

    const getStore = () => {
      const Collection = collection(db, "Store");
      const q = query(Collection, orderBy("name", "asc"));
      onSnapshot(q, (snapshot) => {
        dispatch(addStore(
          (snapshot).docs.map((doc) => ({
            ...doc.data(),
            did:doc.id
          }))
        ));
      })
    }
    getStore();
  }, []);

  useEffect(() => {
    store?.filter((val) => {
      return (val.id === user?.uid)
    }).map((curr, _) => {
      dispatch(setCurrentStore(curr));
    })
  },[store]);


  return (
    <>
      {
        loading === true ? <Typography>Loading</Typography> : <Routes>
          <Route path="/"
            element={<>
              <NavBar />
              <HomeSlider />
              <HomePage />
              <Footer />
            </>} />
          <Route path="/login" element={
            <>
              {
                user === null ? <Login /> : <Navigate to="/" />
              }
            </>
          } />
          <Route path="/category/:title"
            element={<>
              <NavBar />
              <CategoryWrapper />
              <Footer />
            </>} />
          <Route path="/product/:id"
            element={<>
              <NavBar />
              <ProductPage />
              <Footer />
            </>} />
          <Route path="/store/:name"
            element={<>
              <NavBar />
              <StorePage />
              <Footer />
            </>} />
          <Route path="/seller/account" element={
            <>
              {
                user === null ? <SellerLogin /> : <Navigate to="/" />
              }
            </>
          } />
        </Routes>
      }
    </>
  );
}

export default App;
