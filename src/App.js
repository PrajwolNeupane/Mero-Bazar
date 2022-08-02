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
import { addCart } from './State Management/Features/Cart/cartSlice.js';
import { addOrder } from './State Management/Features/Order/orderSlice.js';
import { Typography,Stack,Box } from "@mui/material";
import { addProducts } from './State Management/Features/Product/productSlice.js';
import SellerLogin from "./Pages/SellerLogin";
import { db } from './Firebase/DBConnection.js';
import { collection, orderBy, query, onSnapshot, getDocs, doc } from 'firebase/firestore';
import StorePage from "./Pages/StorePage";
import ProtectiveRoute from "./Components/ProtectiveRoute";
import CartPage from './Pages/CartPage.js';
import BuyPage from "./Pages/BuyPage";
import OrderPage from "./Pages/OrderPage";
import { BarLoader } from 'react-spinners';


function App() {


  const { user } = useSelector((state) => state.User);
  const { store, currentStore } = useSelector((state) => state.Store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();




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
    }, 1500);
  }, [currentStore]);

  useEffect(() => {

    const getCartItem = async () => {
      try {
        const Collection = collection(db, `Cart/${user?.uid}/Carts`);
        const data = await getDocs(Collection);
        dispatch(addCart(
          data.docs
            .map((doc) => ({
              ...doc.data()
            }))
        ));
      } catch (error) {
        console.log(error)
      }
    }
    if (user !== null) {
      getCartItem();
    } else {
      dispatch(
        addCart([])
      );
    }
  }, [user]);


  useEffect(() => {

    const getOrderItem = async () => {
      try {
        const Collection = collection(db, `Order/${user?.uid}/Orders`);
        const data = await getDocs(Collection);
        dispatch(addOrder(
          data.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id
            }))
        ));
      } catch (error) {
        console.log(error)
      }
    }
    if (user !== null) {
      getOrderItem();
    } else {
      dispatch(
        addCart([])
      );
    }
  }, [user]);

  useEffect(() => {

    const getStore = () => {
      const Collection = collection(db, "Store");
      const q = query(Collection, orderBy("name", "asc"));
      onSnapshot(q, (snapshot) => {
        dispatch(addStore(
          (snapshot).docs.map((doc) => ({
            ...doc.data(),
            did: doc.id
          }))
        ));
      })
    }
    getStore();
  }, []);

  useEffect(() => {
    const getProduct = () => {
      const Collection = collection(db, "Product");
      const q = query(Collection, orderBy("rate", "desc"));
      onSnapshot(q, (snapshot) => {
        dispatch(addProducts(
          (snapshot).docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        ))
      })
    }
    getProduct();
  }, [])

  useEffect(() => {
    store?.filter((val) => {
      return (val.id === user?.uid)
    }).map((curr, _) => {
      dispatch(setCurrentStore(curr));
    })
  }, [store]);

  function LoadingScreen() {
    return (
      <Box sx={{ backgroundColor: "#f2f2eb", height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Stack sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant='h2' sx={{ fontSize: "40px", color: "secondary.light" }}>Mero Bazar</Typography>
          <Stack sx={{ alignItems: "center", position: 'absolute', bottom: "40px", gap: "5px" }}>
            <BarLoader width={"100%"} height={"2px"} color="#2c608a" />
            <Typography variant='h4' sx={{ fontSize: "16px", color: "secondary.light" }}>from</Typography>
            <Typography variant='h4' sx={{ fontSize: "16px", color: "secondary.light" }}>Pajwol Neupane</Typography>
          </Stack>
        </Stack>
      </Box>
    )
  }
  return (
    <>
      {
        loading === true ? <LoadingScreen /> : <Routes>
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
          <Route path="/cart"
            element={<>
              <ProtectiveRoute com={<CartPage />} />
            </>} />
          <Route path="/payment"
            element={<>
              <ProtectiveRoute com={<BuyPage />} />
            </>} />
          <Route path="/orders"
            element={<>
              <ProtectiveRoute com={ <OrderPage />} />
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
