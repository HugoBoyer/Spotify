import React from 'react'
import {motion} from "framer-motion";
import logo from "../Images/logo.png";
import Header from "./Header";

const Chargement= ()=> {
    return(
        <>
            <Header/>
            <motion.div style={{marginLeft: "20.5%",textAlign:"center"}} initial={{ y:"100vh"}} animate={{ y: 0}} exit={{y:"-450vh"}} transition={{ duration: 0.5, type: "spring" }}>
                <motion.img src={logo} style={{objectFit:"cover",width:"500px",height:"500px"}} 
                    animate={{scale:1.1}} transition={{yoyo:Infinity,duration:0.5}}
            />
            <motion.h1 animate={{scale:1.1}} transition={{yoyo:Infinity,duration:0.5}} >Chargement 😅🎶</motion.h1>
            </motion.div>
        </>
    )
}

export default Chargement;
