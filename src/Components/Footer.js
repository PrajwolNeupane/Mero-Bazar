import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoresData, CategoriesData } from './data';

export default function Footer() {

  const Navigate = useNavigate();

  return (
    <Box sx={{
      width: "100%", height: "300px", background: "linear-gradient(to Top,rgb(35, 78, 112,1), rgb(44, 96, 138,0.7)) ,url(https://www.esspl.com/wp-content/uploads/2019/10/tms-thegem-blog-default.jpg)", marginTop: "20px", display: "flex"
      , justifyContent: "space-between", alignItems: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed",
      backgroundPosition: "center"
    }}>
      <Stack sx={{ margin: "0px 5%", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Stack>
          <Typography variant='h2' sx={{ color: "white", fontSize: "40px" }}>Mero Bazar</Typography>
          <Typography variant='h5' sx={{ color: "white", fontSize: "16px" }}>	&#169; Prajwol Neupane</Typography>
        </Stack>
        <Stack sx={{ margin: "0px 5%", flexDirection: "row", gap: "10%", width: "40%", alignItems: "center", justifyContent: "center" }}>
          <Stack>
            <Typography variant='h4' sx={{ color: "white", fontSize: "16px" }}>Category</Typography>
            {
              CategoriesData.map((curr, indx) => (
                <Typography variant='h5' sx={{ color: "white", fontSize: "14px", cursor: "pointer" }} onClick={() => {
                  Navigate("/category/" + curr.title.toLowerCase().replace(/\s/g, ""));
                }} key={indx}>{curr.title}</Typography>
              ))
            }
          </Stack>
          <Stack>
            <Typography variant='h4' sx={{ color: "white", fontSize: "16px" }}>Store</Typography>
            {
              StoresData.map((curr, indx) => (
                <Typography variant='h5' sx={{ color: "white", fontSize: "14px", cursor: "pointer" }} onClick={() => {
                  Navigate("/store/" + curr.title.toLowerCase().replace(/\s/g, ""));
                }} key={indx}>{curr.title}</Typography>
              ))
            }
          </Stack>
        </Stack>
        <Stack>
          <Typography variant='h2' sx={{ color: "white", fontSize: "20px" }}>Become a Seller</Typography>
          <Button sx={{
            marginTop: "5px",
            width: "100%",
            padding: "2px 5px",
            color: "secondary.main",
            backgroundColor: "white", "&:hover": {
              backgroundColor: "white"
            },
            borderRadius: "0px", fontSize: "14px"
          }} onClick={() => {
            Navigate("/seller/account");
          }} >Create your account</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
