import react, { useState } from "react";
import { motion } from "framer-motion";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import user from "../Images/user.png";

function Home() {
  return (
    <motion.div
      initial={{ overflowY: "hidden" }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 1 }}
    >
      <div
        className="noselect"
        style={{ textAlign: "center", marginTop: "15px" }}
      >
        <motion.div
          initial={{ y: "80vh", visibility: "hidden" }}
          animate={{ y: -100, visibility: "visible", type: "spring" }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <div>
            <img
              src={logo}
              style={{ objectFit: "cover", width: "400px", height: "400px" }}
            />
          </div>
          <motion.div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <div>
              <h1 style={{ color: "#00c4cc" }}>My Spotify</h1>
              <p style={{ color: "#ee3ec9" }}>Écoute et médite</p>
              <motion.button
                whileHover={{
                  scale: 1.3,
                  textShadow: "0px 0px 8px #ee3ec9",
                  boxShadow: "0px 3px 8px #ee3ec9",
                }}
                transition={{ yoyo: 5, duration: 0.5 }}style={{width: "100px",height: "35px",border: "0",borderRadius: "100px",marginTop: "15px",backgroundColor: "#4c0bd1",color: "white",}}>
                <Link
                  to="/Decouvrir"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  GO !!
                </Link>
              </motion.button>
            </div>

            <motion.div style={{width: "50px",height: "20px",display: "flex",flexDirection: "row"}} initial={{ x: -10, y: -18, rotate: 20 }}>
              <motion.div initial={{ y: 0, color: "#ee3ec9", fontSize: "30px" }} animate={{ y: -8 }} transition={{ duration: 0.8, yoyo: Infinity }} ><IoMusicalNotesSharp /></motion.div>
              <motion.div initial={{ y: 0, color: "#00c4cc", fontSize: "30px" }} animate={{ y: 5 }} transition={{ duration: 2, yoyo: Infinity, delay: 0.1 }}><IoMusicalNotesSharp /></motion.div>
              <motion.div initial={{ y: 0, color: "#4c0bd1", fontSize: "30px" }} animate={{ y: 8 }} transition={{ duration: 0.8, yoyo: Infinity }}><IoMusicalNotesSharp /></motion.div>
            </motion.div>
            
          </motion.div>
        </motion.div>
        <br />
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          initial={{ y: "90vh", x: -10, opacity: 0 }}
          animate={{ y: [-120, -100, -120], opacity: 1 }}
          transition={{ duration: 3, delay: 2, type: "spring" }}
        >
          <img
            src={user}
            style={{
              objectFit: "cover",
              marginTop: "-50px",
              width: "500px",
              height: "400px",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
