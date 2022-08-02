import { Box, Button, InputBase, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../Firebase/firebase-auth';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


export default function Login() {

    const Navigate = useNavigate();
    const [isCreate, setCreate] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const addUser = () => {
        setLoading(true);
        setNameError("");
        setEmailError("");
        setPasswordError("");
        if (userName === "") {
            setNameError("User Name is required");
        } else if (userEmail === "") {
            setEmailError("User Email is required");
        } else if (userPassword === "") {
            setPasswordError("User Password is required");
        }

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(async () => {
                await updateProfile(auth.currentUser, {
                    displayName: userName
                });
                try {
                    await sendEmailVerification(auth.currentUser);
                    setLoading(false);
                    Navigate("/");
                } catch (e) {
                    console.log(e);
                }
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
            })

    }

    const logIn = () => {
        setLoading(true);
        setEmailError("");
        setPasswordError("");
        if (userEmail === "") {
            setEmailError("User Email is required");
        } else if (userPassword === "") {
            setPasswordError("User Password is required");
        }
        signInWithEmailAndPassword(auth, userEmail, userPassword).then(() => {
            setLoading(true);
            Navigate("/");
        }).catch((e) => {
            if (e.code === "auth/user-not-found") {
                setEmailError("User not found");
            }
            if (e.code === "auth/invalid-email") {
                setEmailError("Invalid Email");
            } if (e.code === "auth/wrong-password") {
                setPasswordError("Wrong Password");
            } else {
                console.log(e.code);
            }
        });
    }


    return (
        <>
            <Box sx={{ width: { md: "30%", sm: "50%", xs: "70%" }, margin: { md: "100px auto 10px auto", sm: "50px auto 10px auto", xs: "25px auto 10px auto" }, padding: "25px 20px", backgroundColor: "#f2f2eb", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
                {
                    isCreate === false ?
                        <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                            <Typography variant='h2' sx={{ fontSize: "35px", color: "text.main" }}>Log in</Typography>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Email</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Email' onChange={(e) => {
                                        setUserEmail(e.target.value);
                                    }} />
                                </Box>
                                {
                                    passwordError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{passwordError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Password</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='password' placeholder='Password' onChange={(e) => {
                                        setUserPassword(e.target.value);
                                    }} />
                                </Box>
                                {
                                    emailError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{emailError}</Typography>
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
                                logIn();
                            }}>
                                Log in
                            </Button>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "14px", color: "text.main"
                            }} variant='h5'>
                                Doesn't have an account ?
                            </Typography>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "16px", color: "secondary.main", cursor: "pointer"
                            }} variant='h3' onClick={() => {
                                setCreate(true);
                            }}>
                                Create an Account
                            </Typography>
                        </Stack> :
                        <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                            <Typography variant='h2' sx={{ fontSize: "35px", color: "text.main" }}>Create an Account</Typography>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Name</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Name' onChange={(e) => {
                                        setUserName(e.target.value);
                                    }} />
                                </Box>
                                {
                                    nameError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{nameError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Email</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Email' onChange={(e) => {
                                        setUserEmail(e.target.value);
                                    }} />
                                </Box>
                                {
                                    emailError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{emailError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Password</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='password' placeholder='Password' onChange={(e) => {
                                        setUserPassword(e.target.value);
                                    }} />
                                </Box>
                                {
                                    passwordError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{passwordError}</Typography>
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
                                addUser();
                            }}>
                                Create an Account
                            </Button>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "14px", color: "text.main"
                            }} variant='h5'>
                                Have an account ?
                            </Typography>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "16px", color: "secondary.main", cursor: "pointer"
                            }} variant='h3' onClick={() => {
                                setCreate(false);
                            }}>
                                Log in here
                            </Typography>
                        </Stack>
                }
            </Box>
            <Typography sx={{
                width: "30%", margin: "10px auto", textAlign: "center", fontSize:
                    "16px", color: "text.main", cursor: "pointer"
            }} onClick={() => {
                Navigate("/");
            }}>Sign in later</Typography>
            <Modal open={loading} onClose={() => {
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: "30%", sm: "50%", xs: "70%" },
                    bgcolor: '#f2f2eb',
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems:"center"
                }}>
                    <ClipLoader loading={loading} color="#1b1c1f"/>
                </Box>
            </Modal>
        </>
    )
}
