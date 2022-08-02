import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function ProtectiveRoute({ com }) {
  return (
    <>
      <NavBar />
      {com}
      <Footer />
    </>
  )
}
