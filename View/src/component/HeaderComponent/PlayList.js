import React from 'react';
import Header from "../Header";
import {motion} from "framer-motion";
export default function PlayList() {
    return (
        <>
            <Header/>
            <motion.div style={{marginLeft:"20%",border:"1px solid red",paddingTop:"100px"}}
                initial={{ y:"100vh",overflowY: "hidden"}}
                animate={{ y: 0}}
                exit={{y:"-100vh"}}
                transition={{ duration: 1, type: "spring" }}>
                <p>Page PlayList</p>
            </motion.div>
        </>
    )
}
