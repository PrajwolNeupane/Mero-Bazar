import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import './style.css';
import {SalesData} from './data.js';

export default function HomeSlider() {


    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover:true,
        draggable:false,
        arrows:false
    };

    function SliderItem({ title, desc, pastPrice, price, img }) {
        return (
            <Stack sx={{ flexDirection: "row", gap: "10%", alignItems: "center", width: "90%", margin: "0px auto" }}>
                <Stack sx={{ margin: "5% 0px", justifyContent: "space-between", gap: "10px" }}>
                    <Typography variant='h2' sx={{ color: "otherColor.main", fontSize: "60px" }}>
                        20 20 SALE
                    </Typography>
                    <Typography variant='h3' sx={{ color: "white", fontSize: "40px" }}>
                        {title}
                    </Typography>
                    <Typography variant='h5' sx={{ color: "white", fontSize: "18px" }}>
                        {desc}
                    </Typography>
                    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant='h5' sx={{ color: "white", fontSize: "18px" }}><strike>Rs : {pastPrice} </strike></Typography>
                        <Typography variant='h5' sx={{ color: "white", fontSize: "18px" }}>Rs : {price} </Typography>
                    </Stack>
                    <Typography variant='h6' sx={{ color: "otherColor.main", fontSize: "15px", lineHeight: "17px" }}>
                        Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer. Headphones come in many different sizes from big to small. They are also known as earphones, stereophones, headsets or even 'cans'.
                    </Typography>
                    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Button sx={{
                            padding: "2px 10%",
                            backgroundColor: "otherColor.light",
                            color: "secondary.main", "&:hover": {
                                backgroundColor: "otherColor.main",
                            },
                            borderRadius: "10px",
                            border: "1px #faf8bf solid"
                        }}>
                            Buy
                        </Button>
                        <Button sx={{
                            padding: "2px 10%",
                            backgroundColor: "none", "&:hover": {
                                backgroundColor: "otherColor.main",
                                color: "secondary.main"
                            },
                            borderRadius: "10px",
                            border: "1px #faf8bf solid"
                        }}>
                            Add to Cart
                        </Button>
                    </Stack>
                </Stack>
                <img src={img} style={{ width: "500px" }} alt="headphone" />
            </Stack>
        )
    }

    return (
        <Box sx={{ width: "100%", height: "500px", backgroundImage: "linear-gradient(to bottom,#234e70, #2c608a)" }}>
            <Slider {...settings} style={{ overflow: "hidden" }}>
                {
                    SalesData.map((curr, indx) => (
                        <SliderItem key={indx} title={curr.title} desc={curr.desc} pastPrice={curr.pastPrice} price={curr.price} img={curr.img}/>
                    ))
                }
            </Slider>
        </Box>
    )
}

