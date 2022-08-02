import { AppBar, InputBase, Stack, Toolbar, Typography, Badge, getNativeSelectUtilityClasses } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase-auth';
import CloseIcon from '@mui/icons-material/Close';
import { addStore, setCurrentStore } from '../State Management/Features/User/storeSlice.js';



export default function NavBar() {

    const Navigate = useNavigate();
    const { user } = useSelector(state => state.User);
    const { store, currentStore } = useSelector((state) => state.Store);
    const { cartItems } = useSelector((state) => state.Cart);
    const [isVerified, setVerified] = useState(user?.emailVerified);
    const dispatch = useDispatch();




    useEffect(() => {
        setVerified(user?.emailVerified);
    }, [user]);

    useEffect(() => {
        if (user !== null) {
            store?.filter((val) => {
                return (val.id === user?.uid)
            }).map((curr, _) => {
                dispatch(setCurrentStore(curr));
            })
        } else {
            dispatch(setCurrentStore(null));
        }
    }, [user]);

    return (
        <>
            {
                isVerified !== false ? <></> : <Box sx={{ width: "100%", padding: "5px 0px", backgroundColor: "#faf8bf", alignItems: "center", justifyContent: "space-between", flexDirection: "row", display: "flex" }}>
                    <Typography sx={{ fontSize: "14px", color: 'text.main', marginLeft: "5%" }} variant='h3'>Please verify your email address.(Check verification link under spam folder in gmail.)</Typography>
                    <CloseIcon sx={{ fontSize: "20px", marginRight: "5%", cursor: "pointer" }} onClick={() => {
                        setVerified(true);
                    }} />
                </Box>
            }

            <AppBar sx={{ backgroundColor: "seondary.main" }} elevation="0px" position='static'>
                <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Stack sx={{ flexDirection: "row", gap: "80px", alignItems: "center" }}>
                        <Typography variant='h2' sx={{ color: "text.main", fontSize: {md:"25px",xs:"20px"}, cursor: "pointer" ,overflow:"hidden"}} onClick={() => {
                            Navigate("/");
                        }}>Mero Bazar</Typography>
                    </Stack>
                    {
                        user === null ? <Typography variant='h4' sx={{marginLeft:{md:"50%",xs:"0%"}, color: "text.main",overflow:"hidden", fontSize: {md:"18px",xs:"16px"} ,cursor: "pointer" }} onClick={() => {
                            Navigate("/login");
                        }}>Login</Typography> : <> {
                            currentStore === null ? <Typography variant='h4' sx={{ marginLeft:{md:"50%",xs:"0%"},color: "text.main", overflow:"hidden", fontSize: {md:"18px",xs:"16px"} , cursor: "pointer" }} onClick={async () => {
                                await signOut(auth)
                            }}>LogOut</Typography> : <Typography variant='h4' sx={{ color: "text.main",marginLeft:{md:"50%",xs:"0%"}, fontSize: {md:"18px",xs:"16px"}, cursor: "pointer",overflow:"hidden"}} onClick={async () => {
                                await signOut(auth)
                            }}>Store</Typography>
                        }</>
                    }
                    {
                        user === null ? <></> : <Stack sx={{ gap: "0px",cursor:"pointer" }} onClick={()=>{
                            Navigate("/orders");
                        }}>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" ,display:{md:"block",xs:"none"},overflow:"hidden" }}>Hi</Typography>
                            <Typography variant='h5' sx={{ color: "text.main", fontSize: "18px",display:{md:"block",xs:"none"},overflow:"hidden"  }}>{user?.displayName}</Typography>
                        </Stack>
                    }
                    <Typography variant='h4' sx={{ color: "text.main", fontSize: {md:"18px",xs:"16px"}, cursor: "pointer",overflow:"hidden"}} onClick={()=>{
                        if(user !== null){
                            Navigate("/cart");
                        }else{
                            Navigate("/login");
                        }
                       
                    }}>Cart {cartItems?.length}</Typography>
                </Toolbar>
            </AppBar> 
        </>
    )
}
