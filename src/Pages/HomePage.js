import { Typography, Box, Stack, Button } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import '../Components/style.css'
import StarIcon from '@mui/icons-material/Star';
import { CategoriesData, StoresData, productData } from '../Components/data';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StoreSlider from '../Components/StoreSlider';
import CategorySlider from '../Components/CategorySlider';
import { useSelector} from 'react-redux';

export default function HomePage() {


  const Navigate = useNavigate();
  const [value, setValue] = useState(10000);
  const { store } = useSelector((state) => state.Store);

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <>
      <CategorySlider data={CategoriesData}/>
      <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Typography variant='h2' sx={{ color: "text.main", fontSize: "22px" }}>Products</Typography>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <Typography variant='h3' sx={{ color: "text.main", fontSize: "16px" }}>Price :</Typography>
            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>{1000}</Typography>
            <input type={"range"} min={1000} max={10000} style={{ width: "300px", height: "5px" }} onChange={(e) => {
              setValue(e.target.value);
            }} value={value} />
            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px" }}>{value}</Typography>
          </Stack>
        </Stack>
        <div className='grid-box'>
          {
            productData?.filter((val) => {
              if(value === 10000){
                  return val;
              }else{
                var temp_data = val.price * 100;
                return (value >= temp_data);
              }
            }).map((curr, indx) => (
              <Stack sx={{ gap: "5px", alignItems: "flex-start", backgroundColor: "white", padding: "10px", width: "200px" ,cursor:"pointer"}} key={indx} onClick={()=>{
                Navigate("/product/"+curr.id);
              }}>
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
            ))
          }
        </div>

      </Box>
      <StoreSlider data={store}/>
    </>
  )
}
