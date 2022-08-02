import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/logo.png';
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase/DBConnection.js';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../State Management/Features/Order/orderSlice';
import KhaltiCheckout from "khalti-checkout-web";
import config from '../Components/KhaltiConfig.js';

export default function BuyPage() {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.Cart);
    const { user } = useSelector((state) => state.User);
    const [price, setPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const Navigate = useNavigate();

    let checkout = new KhaltiCheckout(config);

    useEffect(() => {
        const totalPrice = () => {
            var temp = 0;
            cartItems?.forEach((curr, _) => {
                temp = Number(temp) + Number(`${curr.price}`);
            });
            setPrice(temp);
        }
        totalPrice();
    }, [cartItems]);

    const placeOrder = () => {
        const time = Date();
        const Collection = doc(db, `Order/${user?.uid}/Orders`, time.toLocaleString());
        setDoc(Collection, {
            items: cartItems
        }).then(async () => {
            setOpen(false);
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
                Navigate("/orders");
            } catch (error) {
                console.log(error)
            }

        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
            <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography sx={{ color: "text.main", fontSize: { md: "22px", sm: "20px", xs: "18px" } }} variant="h3">Your Detail</Typography>
                <Stack>
                    <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{ fontWeight: 500 }}>Delivery Address : </span>Nepalgunj-12,Banke</Typography>
                    <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{ fontWeight: 500 }}>Phone Number : </span>0987654321</Typography>
                    <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{ fontWeight: 500 }}>Total Price : </span>Rs {price}</Typography>
                </Stack>
                <Box sx={{ width: '100%', height: "1px", backgroundColor: "black" }}>
                </Box>
                {
                    cartItems.length !== 0 ? <> <Stack sx={{ flexDirection: "column", gap: "20px" }}>
                        {
                            cartItems.map((curr, indx) => (
                                <Stack sx={{ flexDirection: "row", gap: "20px", backgroundColor: "white", padding: "5px 10px", alignItems: "center" }} key={indx}>
                                    <img src={curr?.img} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                                    <Stack sx={{ flexDirection: "column", gap: "2px" }}>
                                        <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h4">{curr?.name}</Typography>
                                        <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h5">{curr?.description}</Typography>
                                        <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Price : Rs {curr?.price}</Typography>
                                        <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Type : {curr?.type}</Typography>
                                    </Stack>
                                </Stack>
                            ))
                        }
                    </Stack></> : <Stack sx={{ alignItems: "center", justifyContent: "center", margin: "100px 0px" }}>
                        <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h3">Your Cart is Empty</Typography>
                    </Stack>
                }
                <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{ fontWeight: 500 }}>Total Price : </span>Rs {price}</Typography>
                {
                    cartItems.length !== 0 ? <><Button sx={{
                        width: "300px",
                        padding: "2px",
                        color: "white",
                        backgroundColor: "secondary.light", "&:hover": {
                            backgroundColor: "secondary.main"
                        },
                        borderRadius: "0px",
                    }} onClick={() => {
                        placeOrder();
                        checkout.show({ amount: 2500 })
                    }}>
                        <img src={logo} style={{ width: "70px" }} /> Pay From Khalti
                    </Button>
                        <Typography sx={{ color: "text.main", fontSize: { md: "16px", sm: "14px", xs: "12px" } }} variant="h5">(Since this is on Test Mode ,the  amount will under be Rs 200)</Typography>
                        <Button sx={{
                            width: "300px",
                            padding: "8px 0px",
                            color: "white",
                            backgroundColor: "secondary.light", "&:hover": {
                                backgroundColor: "secondary.main"
                            },
                            borderRadius: "0px",
                        }} onClick={() => {
                            setOpen(true);
                        }}>
                            Cash on Delivery
                        </Button></> : <></>
                }
            </Box>
            <Modal open={open} onClose={() => {
                setOpen(false);
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: "30%", sm: "50%", xs: "70%" },
                    bgcolor: '#f2f2eb',
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <Typography sx={{ textAlign: "center", fontSize: "18px" }} variant="h4">Do you wanna confirm your Order ?</Typography>
                    <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button sx={{
                            width: "30%",
                            padding: "2px 0px",
                            color: "white",
                            backgroundColor: "secondary.light", "&:hover": {
                                backgroundColor: "secondary.main"
                            },
                            borderRadius: "0px",
                        }} onClick={() => {
                            setOpen(false);
                        }}>
                            No
                        </Button>
                        <Button sx={{
                            width: "30%",
                            padding: "2px 0px",
                            color: "white",
                            backgroundColor: "secondary.light", "&:hover": {
                                backgroundColor: "secondary.main"
                            },
                            borderRadius: "0px",
                        }} onClick={() => {
                            placeOrder();
                        }}>
                            Yes
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
