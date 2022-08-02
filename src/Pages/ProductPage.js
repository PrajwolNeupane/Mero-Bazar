import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StoreSlider from '../Components/StoreSlider.js';
import SimilaryProduct from '../Components/SimilaryProduct.js';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../Firebase/DBConnection.js';
import { addCart } from '../State Management/Features/Cart/cartSlice.js';
import '../Components/style.css'

export default function ProductPage() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.Product);
    const { store } = useSelector((state) => state.Store);
    const { user } = useSelector((state) => state.User);
    const [type, setType] = useState("");


    const Navigate = useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        products.filter((val) => {
            return (val.id.includes(id))
        }).map((curr, _) => {
            setType(curr?.type);
        })
    }, [id]);


    const addToCart = async (item) => {
        const id = Date.now().toString();
        const Collection = doc(db, `Cart/${user?.uid}/Carts`, id);

        await setDoc(Collection, {
            ...item,
            id: id
        });
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

    return (
        <>
            {
                products?.filter((val) => {
                    return (val.id.includes(id));
                }).map((curr, indx) => (
                    <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: { md: "row", sm: "row", xs: "column" }, gap: "20px" }} key={indx}>
                        <img src={curr?.img} alt={curr?.name} className={"product-img"} />
                        <Stack sx={{ gap: { md: "10px", sm: "6px", xs: "6px" } }}>
                            <Typography variant='h2' sx={{ color: "text.main", fontSize: { md: "23px", sm: "20px", xs: "18px" } }}>{curr?.name}</Typography>
                            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: { md: "5px", sm: "5px", xs: "2px" } }}>
                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "0px" }}>
                                    {
                                        Math.round(curr?.rate * 2) % 2 === 0 ? <>
                                            {
                                                Array(Math.round(curr?.rate * 2) / 2).fill().map((_, indx) => (
                                                    <StarIcon sx={{ fontSize: "30px", color: "#FFD700" }} key={indx} />
                                                ))
                                            }
                                        </> : <>
                                            {
                                                Array(Math.round(curr?.rate * 2 - 1) / 2).fill().map((_, indx) => (
                                                    <StarIcon sx={{ fontSize: "30px", color: "#FFD700" }} key={indx} />
                                                ))
                                            }
                                            <StarHalfIcon sx={{ fontSize: "30px", color: "#FFD700" }} />
                                        </>
                                    }

                                </Stack>
                                <Typography variant='h4' sx={{ color: "text.main", fontSize: "14px" }}>({curr?.rate})</Typography>
                            </Stack>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "16px" } }}>{curr?.description}</Typography>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "16px" }, cursor: "pointer" }} onClick={
                                () => {
                                    Navigate("/store/" + curr?.storeId);
                                }
                            }>Store : {store.filter((val) => {
                                return (val.id.includes(curr?.storeId))
                            }).map((curr, _) => (curr.name))}</Typography>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "16px" }, cursor: "pointer" }} onClick={
                                () => {
                                    Navigate("/category/" + curr?.type.toLowerCase().replace(/\s/g, ""));
                                }}>Type : {type}</Typography>
                            <Typography variant='h3' sx={{ fontSize: { md: "20px", sm: "17px", xs: "17px" }, color: "text.color" }}>Pirce : Rs {curr?.price}</Typography>
                            <Button sx={{
                                width: "90%",
                                padding: "2px 0px",
                                color: "otherColor.main",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }}
                                onClick={
                                    () => {
                                        if (user === null) {
                                            Navigate("/login");
                                        } else {
                                            addToCart(curr);
                                        }
                                    }
                                }>
                                Add to Cart
                            </Button>
                        </Stack>
                    </Box>
                ))
            }
            <SimilaryProduct data={products.filter((val) => {
                return (!val.id.includes(id))
            }).filter((val) => {
                return (val.type.includes(type))
            })} />
            <StoreSlider data={store} />
        </>
    )
}
