import { Box, Stack, Typography, InputBase, Button } from '@mui/material'
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../Firebase/firebase-auth';
import { db } from '../Firebase/DBConnection.js';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

export default function SellerLogin() {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const Navigate = useNavigate();

    const registerStore = () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setAddressError("");
        setPhoneError("");
        if (name === "") {
            setNameError("Store name is required");
        } else if (email === '') {
            setEmailError("Store email is required");
        } else if (password === '') {
            setPasswordError("Password is required");
        } else if (address === "") {
            setAddressError("Address is required");
        } else if (phone === '') {
            setPhoneError('Phone Number is required');
        }
        else {
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    const Collection = collection(db, "Store");
                    addDoc(Collection, {
                        id: auth.currentUser.uid,
                        name: name,
                        email: email,
                        phone: phone,
                        address: address,
                        img:"https://cdn.pixabay.com/photo/2020/04/17/19/48/city-5056657__340.png",
                        description:"Welcome to our shop."
                    }).then(() => {
                        sendEmailVerification(auth.currentUser).then(() => {
                            Navigate("/");
                        })
                    })
                })
            }).catch((e) => {
                if (e.code == "auth/invalid-email") {
                    setEmailError("Invalid Email");
                } if (e.code == "auth/weak-password") {
                    setPasswordError("Weak Password");
                } if (e.code == "auth/email-already-in-use") {
                    setEmailError("Email alreday in use");
                } else {
                    console.log(e);
                }
            });


        }

    }



    return (
        <Box sx={{ width: {md:"30%",sm:"50%",xs:"70%"}, margin: {md:"35px auto",sm:"20px auto",xs:"10px auto"}, padding: "15px 20px", backgroundColor: "#f2f2eb", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
            <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                <Typography variant='h2' sx={{ fontSize: "35px", color: "text.main" }}>Become a Seller</Typography>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Name</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Name' onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    {
                        nameError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{nameError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Email</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Email' onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </Box>
                    {
                        emailError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{emailError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Password</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='password' placeholder='Password' onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </Box>
                    {
                        passwordError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{passwordError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Address</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Address' onChange={(e) => {
                            setAddress(e.target.value);
                        }} />
                    </Box>
                    {
                        addressError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{addressError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Telphone Number</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='tel' placeholder='Number' onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                    </Box>
                    {
                        phoneError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{phoneError}</Typography> : <></>
                    }
                </Stack>
                <Button sx={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "secondary.light", "&:hover": {
                        backgroundColor: "secondary.main"
                    },
                    borderRadius: "0px",
                }} onClick={() => {
                    registerStore();
                }}>
                    Create Seller Account
                </Button>
                <Typography sx={{
                    margin: "0px auto", fontSize:
                        "14px", color: "text.main"
                }} variant='h5'>
                    Have an account ?
                </Typography>
                <Typography sx={{
                    margin: "0px auto", fontSize: "16px", color: "secondary.main", cursor: "pointer"
                }} variant='h3' onClick={() => {
                    Navigate("/login");
                }}>
                    Log in here.
                </Typography>
            </Stack>

        </Box>
    )
}
