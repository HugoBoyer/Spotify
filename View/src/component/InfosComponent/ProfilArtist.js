import React, {useEffect,useState,useRef} from 'react';
import Header from "../Header";
import Chargement from "../Chargement";
import "../Style/Decouvrir.css"
import {motion} from "framer-motion";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const ProfilArtist = (props) =>{

    const [artist,setArtist] = useState(props.ArtisteName);
    const [data,setData] = useState([]);
    const [album,setAlbum] = useState([]);
    const ref = useRef(false);

    useEffect(()=>{
        const fetchData = async () =>{
            if(artist !== ""){
                const url = "http://spotify-api.local/Controller/API.php";
                // Obtenir les détails de l'artiste
                await axios.post(url,JSON.stringify({
                    req : "getArtistDetail",
                    artist : artist,
                    // artist : `${props.ArtisteName}`,
                }))
                .then( async function(response) {
                    await setData(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        
                // Obtenir les albums de l'artiste
                await axios.post(url,JSON.stringify({
                    req : "getAlbumsFromArtist",
                    artist : artist,
                    // artist : `${props.ArtisteName}`,
                }))
                .then( async function(response) {
                    await setAlbum(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        }
        fetchData();
    },[artist]);

    const registerAlbum = (AlbumName)=>{
        ref.current.click();
        props.sendToReduxAlbumName(AlbumName);
    }
    if(data.length !== 0 && album.length !== 0){

        return (
            <>
                <Header/>
                <motion.div className="divMain" initial={{ y:"100vh"}} animate={{y: 0}} exit={{y:"-450vh"}} transition={{ duration: 1, type: "spring" }}>
                    <motion.div style={{textAlign:"center",marginLeft:"1vw"}} initial={{opacity:0,scale:0.8}} animate={{scale:1,opacity:1}} transition={{delay:0.5,duration:2,type: "spring"}}>
                        <motion.img src={data[0].photo} style={{width:"80%",height:"480px",objectFit:"cover",borderRadius:"50px",marginBottom:"20px"}} whileHover={{opacity:0.9}}/>
                        <h1> {data[0].name} </h1>
                        <h5 style={{color:"#00c4cc"}}> {data[0].description} </h5>
                    </motion.div>
                    <div style={{marginLeft:"1vw",marginBottom:"20px"}}>
                        <h3 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>Bio</h3>
                        <motion.div style={{width:"80%",margin:"auto"}} initial={{opacity:0,scale:0.9}} animate={{opacity:0.5}} whileHover={{scale:1,marginTop:"10px",marginBottom:"10px",opacity:1,textShadow:"0.5px 0.5px 1px #00c4cc"}} transition={{duration:1.5,type: "spring"}}>
                            <p> {data[0].bio} </p>
                        </motion.div>
                    </div>

                    <div style={{marginLeft:"1vw"}}>
                        <h3 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}} >Albums</h3>
                        <div style={{margin:"15px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                        {album.map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginBottom:"10px",paddingRight:"10px"}} 
                                onClick={()=>registerAlbum(res.name)}
                            >
                                <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer",marginBottom:"10px"}}/>
                                <h5>{res.name}</h5>
                                <Link to="/AlbumChoice" ref={ref}/>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                </motion.div>
            </>
        )
    }else{
        return(
            <Chargement/>
        )
    }
}

function  mapDispatchToProps(dispatch){
    return{
        sendToReduxAlbumName : function(Album){
            dispatch({type:"Album",Album:Album})
        },
    }
}
function mapStateToProps(state){
    return {ArtisteName: state.ArtisteName}
  }
  export default connect(mapStateToProps,mapDispatchToProps)(ProfilArtist);