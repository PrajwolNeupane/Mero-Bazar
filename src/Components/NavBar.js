import { AppBar, InputBase, Stack, Toolbar, Typography, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { useSelector,useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase-auth';
import CloseIcon from '@mui/icons-material/Close';
import { addStore,setCurrentStore } from '../State Management/Features/User/storeSlice.js';



export default function NavBar() {

    const Navigate = useNavigate();
    const { user } = useSelector(state => state.User);
    const { store,currentStore } = useSelector((state) => state.Store);
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
        }else{
            dispatch(setCurrentStore(null));
        }
    },[user] );




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
                    <Stack sx={{ flexDirection: "row", gap: "20px", alignItems: "center" }}>
                        <Typography variant='h2' sx={{ color: "text.main", fontSize: "25px", cursor: "pointer" }} onClick={() => {
                            Navigate("/");
                        }}>Mero Bazar</Typography>
                    </Stack>
                    <Box sx={{ width: "50%", backgroundColor: "white", padding: "2px 2%", display: "flex", alignItems: "center", gap: "1%" }}>
                        <InputBase placeholder='Search Product' fullWidth />
                        <SearchIcon sx={{ fontSize: "25px" }} />
                    </Box>
                    {
                        user === null ? <Typography variant='h4' sx={{ color: "text.main", fontSize: "18px", cursor: "pointer" }} onClick={() => {
                            Navigate("/login");
                        }}>Login</Typography> : <> {
                            currentStore === null ? <Typography variant='h4' sx={{ color: "text.main", fontSize: "18px", cursor: "pointer" }} onClick={async () => {
                                await signOut(auth)
                            }}>LogOut</Typography> : <Typography variant='h4' sx={{ color: "text.main", fontSize: "18px", cursor: "pointer" }} onClick={async () => {
                                await signOut(auth)
                            }}>Store</Typography>
                        }</>
                    }
                    {
                        user === null ? <></> : <Stack sx={{ gap: "0px" }}>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>Hi</Typography>
                            <Typography variant='h5' sx={{ color: "text.main", fontSize: "18px" }}>{user?.displayName}</Typography>
                        </Stack>
                    }
                    <Badge badgeContent={4} color="secondary">
                        <ShoppingCartIcon sx={{ fontSize: "35px", color: "text.main" }} />
                    </Badge>
                </Toolbar>
            </AppBar>
        </>
    )
}
