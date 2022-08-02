import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productData, StoresData } from '../Components/data.js';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StoreSlider from '../Components/StoreSlider.js';
import SimilaryProduct from '../Components/SimilaryProduct.js';

export default function ProductPage() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [similarData, setSimilarData] = useState([]);

    const [counter, setCounter] = useState();

    const Navigate = useNavigate();


    const getData = () => {
        productData?.filter((val) => {
            return (val.id === Number(id));
        }).map((curr, _) => {
            setData([curr]);
        })
    }
    const getSimilarData = () => {
        productData?.filter((val) => {
            return (val.id !== Number(id));
        }).map((curr, _) => {
            setSimilarData(old => [...old, curr]);
        })
    }

    useEffect(() => {
        setCounter(1);
        getData();
        getSimilarData();
        window.scrollTo(0,0);
    }, [id]);

    console.log(data);

    return (
        <>
            {
                data.map((curr, indx) => (
                    <Box sx={{ margin: "20px 4% 0px 4%", padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "row", gap: "20px" }} key={indx}>
                        <img src={curr.image} style={{ width: "400px" }} alt={curr.title} />
                        <Stack sx={{ gap: "10px" }}>
                            <Typography variant='h2' sx={{ color: "text.main", fontSize: "23px" }}>{curr.title}</Typography>
                            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "0px" }}>
                                    {
                                        Math.round(curr.rating.rate * 2) % 2 === 0 ? <>
                                            {
                                                Array(Math.round(curr.rating.rate * 2) / 2).fill().map((_, indx) => (
                                                    <StarIcon sx={{ fontSize: "30px", color: "#FFD700" }} key={indx} />
                                                ))
                                            }
                                        </> : <>
                                            {
                                                Array(Math.round(curr.rating.rate * 2 - 1) / 2).fill().map((_, indx) => (
                                                    <StarIcon sx={{ fontSize: "30px", color: "#FFD700" }} key={indx} />
                                                ))
                                            }
                                            <StarHalfIcon sx={{ fontSize: "30px", color: "#FFD700" }} />
                                        </>
                                    }

                                </Stack>
                                <Typography variant='h4' sx={{ color: "text.main", fontSize: "14px" }}>({curr.rating.rate})</Typography>
                            </Stack>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: "18px" }}>{curr.description}</Typography>
                            <Typography variant='h3' sx={{ fontSize: "20px", color: "text.color" }}>Pirce : Rs {curr.price * 1000}</Typography>
                            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "20px", justifyContent: "flex-start" }}>
                                <Button sx={{
                                    width: "10%",
                                    padding: "2px 0px",
                                    color: "white",
                                    backgroundColor: "secondary.light", "&:hover": {
                                        backgroundColor: "secondary.main"
                                    },
                                    borderRadius: "0px",
                                }} onClick={() => {
                                    if (counter > 1) {
                                        setCounter(counter - 1);
                                    } else {
                                        setCounter(1);
                                    }
                                }}>-</Button>
                                <Typography variant='h3' sx={{ fontSize: "18px", color: "text.main" }}>{counter}</Typography>
                                <Button sx={{
                                    width: "10%",
                                    padding: "2px 0px",
                                    color: "white",
                                    backgroundColor: "secondary.light", "&:hover": {
                                        backgroundColor: "secondary.main"
                                    },
                                    borderRadius: "0px",
                                }} onClick={() => {
                                    setCounter(counter + 1);
                                }}>+</Button>

                            </Stack>
                            <Button sx={{
                                width: "25%",
                                padding: "5px 0px",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }}>
                                Buy
                            </Button>
                            <Button sx={{
                                width: "25%",
                                padding: "5px 0px",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }}>
                                Add to cart
                            </Button>
                        </Stack>
                    </Box>
                ))
            }
            <SimilaryProduct data={similarData} />
            <StoreSlider data={StoresData} />
        </>
    )
}
