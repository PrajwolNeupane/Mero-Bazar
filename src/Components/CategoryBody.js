import { Box, Stack, Typography, InputBase,Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import '../Components/style.css';
import {  productData ,StoresData} from '../Components/data';
import { useNavigate} from 'react-router-dom';
import StoreSlider from './StoreSlider';

export default function CategoryBody() {

    const [value, setValue] = useState(10000);
    const [search,setSearch] = useState("");
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

      
    function SingleItem ({curr}){
        return (
            <Stack sx={{ gap: "5px", alignItems: "flex-start", backgroundColor: "white", padding: "10px", width: "200px",cursor:"pointer"}} 
            onClick={()=>{
              Navigate("/product/"+curr.id);
            }}
            >
            <img src={curr.image} alt={curr.title} style={{ width: "180px", height: "150px", objectFit: "cover" }} />
            <Typography variant='h3' sx={{ color: "text.main", fontSize: "18px" }}>
              {curr.title}
            </Typography>
            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>
              Rs {curr.price * 100}
            </Typography>
            <Stack  sx={{ flexDirection: "row", alignItems: "flex-end" ,justifyContent:"space-between",width:"100%"}}>
              <Stack sx={{ flexDirection: "row", alignItems: "center" ,gap:"0px"}}>
                {
                  Math.round(curr.rating.rate * 2) % 2 === 0 ? <>
                    {
                      Array(Math.round(curr.rating.rate * 2) / 2).fill().map((_, indx) => (
                        <StarIcon sx={{ fontSize: "20px", color: "#FFD700" }} key={indx} />
                      ))
                    }
                  </> : <>
                    {
                      Array(Math.round(curr.rating.rate * 2 - 1) / 2).fill().map((_, indx) => (
                        <StarIcon sx={{ fontSize: "20px", color: "#FFD700" }} key={indx} />
                      ))
                    }
                    <StarHalfIcon sx={{ fontSize: "20px", color: "#FFD700" }} />
                  </>
                }

              </Stack>
              <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>{curr.rating.rate}</Typography>
            </Stack>
            <Button sx={{
              width: "100%",
              padding: "2px 0px",
              color: "white",
              backgroundColor: "secondary.light", "&:hover": {
                backgroundColor: "secondary.main"
              },
              borderRadius: "0px",
            }}>
              Buy
            </Button>
            <Button sx={{
              width: "100%",
              padding: "2px 0px",
              color: "secondary.main",
              backgroundColor: "otherColor.light", "&:hover": {
                backgroundColor: "otherColor.main"
              },
              borderRadius: "0px",
            }}>
              Add to Cart
            </Button>
          </Stack>
        )
    }
    function SlideItem({ img, title }) {
        return (
          <Stack sx={{ gap: "5px", alignItems: "center", backgroundColor: "white", padding: "10px", width: "200px",cursor:"pointer" }} onClick={()=>{
            Navigate("/category/"+title.toLowerCase().replace(/\s/g, ""));
          }}>
            <img src={`${img}}`} alt={title} style={{ width: "180px", height: "150px", objectFit: "cover" }} />
            <Typography variant='h3' sx={{ color: "text.main", fontSize: "18px" }}>
              {title}
            </Typography>
          </Stack>
        )
      }
    

    return (
        <>
        <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h2' sx={{ color: "text.main", fontSize: "22px" }}>Products Avaiable</Typography>
                <Box sx={{ width: "40%", backgroundColor: "white", padding: "2px 2%", display: "flex", alignItems: "center", gap: "1%" }}>
                    <InputBase placeholder='Search Product' fullWidth onChange={(e)=>{
                        setSearch(e.target.value);
                    }}/>
                    <SearchIcon sx={{ fontSize: "25px" }} />
                </Box>
                <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>{1000}</Typography>
                <input type={"range"} min={1000} max={10000} style={{ width: "300px", height: "5px" }} onChange={(e) => {
                    setValue(e.target.value);
                }} value={value} />
                <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>{value}</Typography>
            </Stack>
            <div className='grid-box'>
                {
                    productData?.filter((val) => {
                        if(search === ""){
                            return val;
                        }else if(val.title.toLowerCase().includes(search.toLowerCase())){
                            return val;
                        }else{
                          return [];
                        }
                    }).filter((val) => {
                        if(value === 10000){
                            return val;
                        }else{
                          var temp_data = val.price * 100;
                          return (value >= temp_data);
                        }
                      }).map((curr, indx)=>(
                            <SingleItem curr={curr} key={indx}/>
                      ))
                }
            </div>
        </Box>
        <StoreSlider data={StoresData}/>
        </>
    )
}
