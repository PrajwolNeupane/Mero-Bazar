import { Stack, Typography,Box } from '@mui/material';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { useNavigate} from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function StoreSlider({ data }) {


    const Navigate  = useNavigate();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        draggable: true,
        arrows: true,
        prevArrow: <ArrowBackIosNewIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />,
        nextArrow: <ArrowForwardIosIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />
      };

    function SlideItem({ img, title,id }) {
        return (
            <Stack sx={{ gap: "5px", alignItems: "center", backgroundColor: "white", padding: "10px", width: "200px", cursor: "pointer" }} onClick={() => {
                Navigate("/store/" + id);
            }}>
                <img src={img} alt={title} style={{ width: "180px", height: "150px", objectFit: "cover" }} />
                <Typography variant='h3' sx={{ color: "text.main", fontSize: "18px" }}>
                    {title}
                </Typography>
            </Stack>
        )
    }

    return (
        <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='h2' sx={{ color: "text.main", fontSize: "22px" }}>Store</Typography>
            <Slider style={{ overflow: "hidden" }} {...settings}>
                {
                    data?.map((curr, indx) => (
                        <SlideItem key={indx} img={curr.img} title={curr.name} id={curr.id}/>
                    ))
                }
            </Slider>
        </Box>
    )
}
