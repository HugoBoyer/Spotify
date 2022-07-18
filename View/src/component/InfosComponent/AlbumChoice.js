import React, { useState,useRef,useEffect } from 'react';
import Header from "../Header";
import Chargement from "../Chargement";
import "../Style/Decouvrir.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { FiChevronsLeft,FiChevronsRight,FiRepeat,FiPlay ,FiPause} from "react-icons/fi";
import {motion} from "framer-motion";
import { getLyrics} from 'genius-lyrics-api';
import { Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BiVolumeFull,BiVolumeLow } from "react-icons/bi";
import axios from 'axios';
import {connect} from 'react-redux';

const AlbumChoice = (props) =>{

    const [album,setAlbum] = useState(props.Album);
    const [lyrics,setLyrics] = useState("");
    const [volum,setVolum] = useState(0.5);
    const [son,setSon] = useState(false);
    const [loop,setLoop] = useState(false);
    const music =  useRef(null);
    const [trackList,setTrackList] = useState([]);
    const [data,setData] = useState([]);
    const [title,setTitle] = useState("");
    const [artist,setArtist] = useState("");
    const [key ,setKey] = useState(0);
    const [dateSortie,setDateSortie] = useState("");
    
    if(music.current !== null){
        music.current.volume = volum;
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            if(album !== ""){
                const url = "http://spotify-api.local/Controller/API.php";
                await axios.post(url,JSON.stringify({
                    req : "getAlbumDetailsAndTracks",
                    album : album,
                    // album : `${props.Album}`,
                }))
                .then( async function(response){
                    await setData(response.data[0]);
                    await setTrackList(response.data["tracks"]);
                    var ts = response.data[0].release_date;
                    var ts_ms = ts * 1000;
                    var date_ob = new Date(ts_ms);
                    var year = date_ob.getFullYear();
                    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    var date = ("0" + date_ob.getDate()).slice(-2);
                    setDateSortie(date+"/"+month+"/"+year);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
        fetchData();
    },[album]);

    const useStyles = makeStyles({
        volume: {
          width:"300px",
          color:"#ee3ec9",
        },
        icons:{
            marginLeft:"20px",
            marginRight:"20px",
            color:"white"
        },
    });
    const classes = useStyles();
    
    function MusicPlay(){
        if(son === false){
            music.current.play();
            setSon(true);
        }else{
            music.current.pause();
            setSon(false);
        }
    }
    
    const GetSon = async (key,title,artist)=>{
        await setKey(key - 1);
        setSon(true);
        music.current.play();
        setArtist(artist);
        setTitle(title);
        GetParoles();
    }
    const GetParoles = () =>{
        const options = {
            apiKey: 'S8Hsts88adqXOh2MQ7JGZg1fp8Aj89Ios6poA2xQpy9IB2HpSwtFwJvkQbC2FmSF',
            title: `${title}`,
            artist: `${artist}`,
            optimizeQuery: true
        };
        getLyrics(options).then((lyrics) => setLyrics(lyrics));
    }
    const Replay = async()=>{
        await music.current.pause();
        music.current.currentTime = 0;
        await music.current.play();
        setSon(true);
    }
    const PistPrecedente = async ()=>{
        if(key > 0){
            setTitle(trackList[key - 1].name);
            setKey(key - 1);
            setSon(true);
            await music.current.pause();
            await music.current.play();
            GetParoles();
        }
    }
    const PistSuivante = async ()=>{
        if(key + 2 <= trackList.length){
            setTitle(trackList[key +1].name);
            setKey(key + 1);
            setSon(true);
            await music.current.pause();
            await music.current.play();
            GetParoles();
        }else{
            setKey(0);
        }
    }

    if(trackList.length !== 0){

        return (
            <>
                <Header/>
                <motion.div className="divMain" initial={{ y:"100vh"}} animate={{y: 0}} exit={{y:"-450vh"}} transition={{ duration: 1, type: "spring" }}>

                    <div style={{display:"flex",flexDirection:"row",height:"auto",padding:"20px"}}>
                        <img src={data.cover} alt="Image Cover" style={{borderRadius:"15px",objectFit:"cover",marginRight:"20px",width:"400px",height:"400px"}} />
                        <div style={{paddingTop:"10vh"}}>
                            <h1 style={{color:"#00c4cc",marginBottom:"10px"}}>{data.name}</h1>
                            <h4 style={{marginBottom:"10px"}}>{data.artist_name}</h4>
                            <h5 style={{opacity:0.5,marginBottom:"10px"}}>Popularité {data.popularity}</h5>
                            <p style={{color:"#ee3ec9",opacity:"0.8"}}>Date de sortie : {dateSortie}</p>
                            <p style={{opacity:0.8}}>{data.description}</p>
                        </div>
                    </div>
    
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
    
                        <div style={{width:"55%",paddingLeft:"2vw",paddingTop:"2vh",marginBottom:"2vh"}}>
                            <h3 style={{marginBottom:"10px"}}>TrackList</h3>
                            {trackList.map((res,key)=>(
                                <motion.h4 style={{marginBottom:"10px",padding:"10px",cursor:"pointer"}}
                                    whileHover={{color:"#ee3ec9",scale:1.1,x:10,borderRadius:"50px",backgroundColor:"rgb(29, 28, 28)"}}
                                    whileTap={{scale:1}}
                                    onClick={()=>GetSon(key+1,res.name,data.artist_name,res.mp3)}
                                >{key+1}. {res.name}</motion.h4>
                            ))}
                           
                        </div>
    
                        <motion.div style={{width:"35%",height:"80vh",overflowY: "auto",overflowX: "hidden"}}
                            initial={{opacity:0.7,scale:0.8}}
                            whileHover={{opacity:1,scale:1.1,marginRight:"20px",y:-10,marginBottom:"20px",marginLeft:"20px"}}
                            transition={{duration: 1, type: "spring"}}
                        >
                            <h3 style={{marginBottom:"10px"}}>Paroles :</h3>
                            {lyrics ? <motion.p whileHover={{color:"#00c4cc"}} style={{lineHeight:"1.6"}}>{lyrics}</motion.p>:<p>LA LAA LAAA <IoMusicalNotesSharp/> ...</p>}
                        </motion.div>
    
                    </div>
    
                <motion.div style={{display:"flex",flexDirection:"row",width:"45%",margin:"0 auto",justifyContent:"center",border:"1px solid #4c0bd1",backgroundColor:"rgb(22, 22, 22)",paddingTop:"3vh",paddingBottom:"3vh",borderRadius:"10px"}}
                    whileHover={{scale:1.1}}
                >
                    <div style={{width:"30%",textAlign:"center"}}>
                        <img src={data.cover_small} alt="cover samll" style={{width:"100px",height:"100px",objectFit:"cover",marginBottom:"5px"}}/>
                        <p>{key + 1} . {trackList[key].name}</p>
                    </div>
    
                    <div style={{width:"70%",textAlign:"center",paddingTop:"20px"}}>
                        
                        <div style={{justifyContent:"center",display:"flex",flexDirection:"row"}}>
    
    
                        <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}} 
                            onClick={()=> Replay()}
                            onDoubleClick={()=>PistPrecedente()}
                        ><FiChevronsLeft/></motion.div>
                           
                           {son ?
                            <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}} 
                                onClick={()=>MusicPlay()}
                            ><FiPause/></motion.div>
                            :
                           <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}}
                                onClick={()=>MusicPlay()}
                           ><FiPlay/></motion.div>
                        }
                           <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}}
                                onClick={()=>PistSuivante()}
                           ><FiChevronsRight/></motion.div>
                           <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={loop ? {color:"#ee3ec9"} : {color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}}
                                onClick={()=>setLoop(!loop)}
                           ><FiRepeat/></motion.div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}}
                                onClick={()=>setVolum(0)}
                            ><BiVolumeLow/></motion.div>
                                <Slider color="secondary" min={0} max={1} step={0.1} className={classes.volume}
                                    onChange={(e)=>setVolum(e.target.value)}
                                    value={volum}
                                />
                            <motion.div initial={{fontSize:"20px",margin:"0 20px"}} animate={{color:"white"}} whileHover={{color:"#ee3ec9",scale:1.4}} whileTap={{scale:0.8}}
                                onClick={()=>setVolum(1)}
                            ><BiVolumeFull/></motion.div>
                        </div>
                    </div>
                </motion.div>
                    <audio
                        style={{visibility:"hidden"}}
                        ref={music}
                        controls
                        loop={loop}
                        src={trackList[key].mp3}>

                    </audio>
                </motion.div>
            </>
        )
    }else{
        return(
            <Chargement/>
        )
    }
}

function mapStateToProps(state){
    return {Album: state.Album}
}
export default connect(mapStateToProps,null)(AlbumChoice);