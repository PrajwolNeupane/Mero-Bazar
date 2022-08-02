import { Box, Typography } from '@mui/material'
import React from 'react'

export default function CategoryHeader() {
  return (
    <Box sx={{
        width: "100%", height: "300px", background: "linear-gradient(to Top,rgb(35, 78, 112,1), rgb(44, 96, 138,0.7)) ,url(https://static.fibre2fashion.com/articleresources/images/23/2287/fashion-big_Big.jpg)", display: "flex"
        , justifyContent: "center", alignItems: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed",
        backgroundPosition: "top",flexDirection:"column"
      }}>
        <Typography variant='h2' sx={{fontSize:"50px",color:"white"}}>Clothing & Fashion </Typography>
        <Typography variant='h6' sx={{fontSize:"20px",color:"white",letterSpacing: "5px" }}>'Fashion is the armor to survive the reality of everyday life.'</Typography>
        <div style={{width:"50%",height:"1px",backgroundColor:"white"}}></div>
        <Typography variant='h6' sx={{fontSize:"18px",color:"white",letterSpacing: "2px" }}>We offer different kinds of items from different brands.</Typography>
    </Box>
  )
}
