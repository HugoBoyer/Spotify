import react ,{useState,useRef} from "react";
import {motion} from "framer-motion";
import logo from "../Images/logo.png"
import {BiSearchAlt2} from "react-icons/bi";
import { IoMusicalNotesSharp } from "react-icons/io5";
import {GiMicrophone} from "react-icons/gi";
import { MdLibraryMusic } from "react-icons/md";
import {AiOutlineOrderedList} from "react-icons/ai";
import "./Style/Header.css";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

const Header = (props) =>{
    const ref = useRef(false);
    const [search,setSearch] = useState("");
    const Icons = {
        initial :{
            scale:1
        },
        hover :{
            scale:1.3,
            cursor:"pointer",
            color:"#ee3ec9",
        }
    }
    const handleKeyPress = (e) =>{
        if (e.key === "Enter" && search !== ""){
            props.sendToReduxSearch(search);
            ref.current.click();
        }
    }

    return(
        <div className="Header">
            <img src={logo} alt="Logo"/>
            <motion.h2 style={{ color: "#00c4cc",marginTop:"-8vh",marginBottom:"9vh",textAlign:"center"}}
                whileHover={{x:[0,2,0,2,0,2,0]}}
                transition={{yoyo:Infinity,duration:1.5}}
            >My Spotify</motion.h2>
            <div id="Search">
                <BiSearchAlt2 id="icon"/>
                <input type = "text" 
                    onChange = {(e)=>setSearch(e.target.value)}
                    value={search}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
            </div>
            <div id="section">
            <Link className="link" to="/Decouvrir"><motion.h4 variants={Icons} initial="initial" whileHover="hover"><IoMusicalNotesSharp /> Accueil</motion.h4> </Link>
            <Link className="link" to="/Artistes"><motion.h4 variants={Icons} initial="initial" whileHover="hover"><GiMicrophone /> Artistes</motion.h4> </Link>
            <Link className="link" to="/Albums"> <motion.h4 variants={Icons} initial="initial" whileHover="hover"><MdLibraryMusic /> Albums</motion.h4> </Link>
            <Link className="link" to="/PlayList"> <motion.h4 variants={Icons} initial="initial" whileHover="hover"><AiOutlineOrderedList /> Playlist</motion.h4> </Link>
            <Link to="/Search" ref={ref}/>
            </div>
        </div>
    )
}
function  mapDispatchToProps(dispatch){
    return{
        sendToReduxSearch: function(search){
            dispatch({type:"search",Search:search})
        },
    }
}
export default connect(null,mapDispatchToProps)(Header);