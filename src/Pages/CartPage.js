import { Box, Button, Stack, Typography } from '@mui/material'
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase/DBConnection';
import { addCart } from '../State Management/Features/Cart/cartSlice.js';

export default function CartPage() {

    const { cartItems } = useSelector((state) => state.Cart);
    const { user } = useSelector((state) => state.User);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

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

    const removeAll = async () => {
        try {
            cartItems?.forEach(async (curr, _) => {
                const Doc = doc(db, `Cart/${user?.uid}/Carts`, curr?.id);
                await deleteDoc(Doc);
                const Collection = collection(db, `Cart/${user?.uid}/Carts`);
                const data = await getDocs(Collection);
                dispatch(addCart(
                    data.docs
                        .map((doc) => ({
                            ...doc.data()
                        }))
                ));
            })

        } catch (e) {
            console.log(e);
        }
    }
    const removeCart = async (id) => {
        try {
            const deletedoc = doc(db, `Cart/${user?.uid}/Carts`, id);
            await deleteDoc(deletedoc);
            const Collection = collection(db, `Cart/${user?.uid}/Carts`);
            const data = await getDocs(Collection);
            dispatch(addCart(
                data.docs
                    .map((doc) => ({
                        ...doc.data()
                    }))
            ));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                <Typography sx={{ color: "text.main", fontSize: "22px" }} variant="h3">
                    Your Cart Items
                </Typography>
                <Stack sx={{ backgroundColor: "otherColor.light", padding: "5px 20px", borderRadius: "3px", border: "1px solid gray", gap: "3px" }}>
                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h4">Total Item : {cartItems.length}</Typography>
                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h4">Total Price : Rs {price}</Typography>
                    {
                        cartItems.length !== 0 ? <><Button sx={{
                            width: "100%",
                            padding: "2px 0px",
                            color: "white",
                            backgroundColor: "secondary.light", "&:hover": {
                                backgroundColor: "secondary.main"
                            },
                            borderRadius: "0px",
                        }} onClick={() => {
                            Navigate("/payment");
                        }}>
                            Buy
                        </Button>
                            <Button sx={{
                                width: "100%",
                                padding: "2px 0px",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }} onClick={() => {
                                removeAll();
                            }}>
                                Remove all
                            </Button></> : <></>
                    }
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', height: "1px", backgroundColor: "black" }}>
            </Box>
            <Stack sx={{ flexDirection: "column", gap: "20px" }}>
                {
                    cartItems.length !== 0 ? <> {
                        cartItems.map((curr, indx) => (
                            <Stack sx={{ flexDirection: "row", gap: "20px", backgroundColor: "white", padding: "5px 10px", alignItems: "center" }} key={indx}>
                                <img src={curr?.img} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                                <Stack sx={{ flexDirection: "column", gap: "2px" }}>
                                    <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h4">{curr?.name}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h5">{curr?.description}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Price : Rs {curr?.price}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Type : {curr?.type}</Typography>
                                    <Button sx={{
                                        width: "150px",
                                        padding: "2px 0px",
                                        color: "white",
                                        backgroundColor: "secondary.light", "&:hover": {
                                            backgroundColor: "secondary.main"
                                        },
                                        borderRadius: "0px",
                                    }} onClick={() => {
                                        removeCart(curr?.id);
                                    }}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Stack>
                        ))
                    }</> : <Stack sx={{ alignItems: "center", justifyContent: "center", margin: "100px 0px" }}>
                        <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h3">Your Cart is Empty</Typography>
                    </Stack>
                }
            </Stack>
        </Box>
    )
}
