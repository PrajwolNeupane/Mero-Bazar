import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Stack, Typography, Button, Modal, InputBase } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/DBConnection';
import {updateProfile, sendEmailVerification,updateEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebase-auth';

export default function StorePage() {

  const { name } = useParams();
  const { currentStore, store } = useSelector((state) => state.Store);
  const { user } = useSelector((state) => state.User);
  const [isAdmin, setAdmin] = useState(false);
  const [storeData, setStoreData] = useState({});
  const [openModal, setModal] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    bgcolor: '#f2f2eb',
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [image, setImage] = useState(null);


  useEffect(() => {
    if (currentStore !== null && user !== null) {
      if (currentStore.id.includes(name)) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
    ;
  }, [user, currentStore]);

  useEffect(() => {
    store.filter((val) => {
      return (val.id.includes(name))
    }).map((curr, _) => {
      setStoreData(curr);
    })
  }, [store]);


  const update = () => {

    setDoc(doc(db, "Store", currentStore?.did), {
      id: currentStore?.id,
      name: newName !== "" ? newName : currentStore?.name,
      email: newEmail !== "" ? newEmail : currentStore?.email,
      phone: newPhone !== "" ? newPhone : currentStore?.phone,
      address: newAddress !== "" ? newAddress : currentStore?.address,
      img: "https://cdn.pixabay.com/photo/2020/04/17/19/48/city-5056657__340.png",
      description: newDescription !== "" ? newDescription : currentStore?.description
    }).then(() => {
      updateProfile(auth.currentUser,{
        displayName:newName !== "" ? newName : currentStore?.name
      }).then(() => {
        setModal(false);
      })
    }).catch((e) => {
      console.log(e);
    })

  }



  return (
    <>
      <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: "50px", margin: "20px" }}>
          <img src={storeData?.img} style={{ width: "300px", height: "300px", objectFit: "contain" }} />
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h3' sx={{ color: "text.main", fontSize: "30px" }}>
              {storeData?.name}
            </Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <EmailIcon sx={{ fontSize: "22px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.email}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <LocationOnIcon sx={{ fontSize: "25px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.address}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <LocalPhoneIcon sx={{ fontSize: "25px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.phone}
              </Typography>
            </Stack>
            {
              isAdmin === true ? <Button sx={{
                width: "200px",
                color: "white",
                backgroundColor: "secondary.light", "&:hover": {
                  backgroundColor: "secondary.main"
                },
                borderRadius: "0px",
              }} onClick={() => {
                setModal(true);
              }}>
                Update Store Profile
              </Button> : <></>
            }
            <Typography>
              {storeData?.description}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Modal
        open={openModal}
        onClose={() => {
          setModal(false);
          setImage(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h3' sx={{ color: "text.main", fontSize: "25px" }}>
            Update store Profile
          </Typography>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Name</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Name' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={currentStore?.name} onChange={(e) => {
                setNewName(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Email</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Email' type='email' sx={{ fontWeight: 400 }} fullWidth defaultValue={currentStore?.email} onChange={(e) => {
                setNewEmail(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Address</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Address' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={currentStore?.address} onChange={(e) => {
                setNewAddress(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Phone</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Phone' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={currentStore?.phone} onChange={(e) => {
                setNewPhone(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Description</Typography>
            <textarea placeholder='Description' style={{ resize: "none", height: "100px", padding: "0px 2px", border: "none", outline: "none" }} defaultValue={currentStore?.description} onChange={(e) => {
              setNewDescription(e.target.value);
            }} />
          </Stack>
          <input type={"file"} id="btn" style={{ display: "none" }} onChange={(e) => {
            if (e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }} />
          <Button sx={{
            width: "100%",
            padding: "2px 0px",
            color: "white",
            backgroundColor: "secondary.light", "&:hover": {
              backgroundColor: "secondary.main"
            },
            borderRadius: "0px",
          }} onClick={() => {
            document.getElementById('btn').click();
          }}>
            Add a photo
          </Button>
          {
            image === null ? <img src={currentStore?.img} style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0px auto" }} /> : <img src={URL.createObjectURL(image)} style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0px auto" }} />
          }
          <Button sx={{
            width: "100%",
            padding: "2px 0px",
            color: "white",
            backgroundColor: "secondary.light", "&:hover": {
              backgroundColor: "secondary.main"
            },
            borderRadius: "0px",
          }} onClick={() => {
            update();
          }}>
            Update
          </Button>
        </Box>
      </Modal>
    </>
  )
}
