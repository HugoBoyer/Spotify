import React, {useRef,useEffect,useState} from 'react';
import Header from "../Header";
import Chargement from "../Chargement";
import {motion} from "framer-motion";
import "../Style/Decouvrir.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

const Artiste = (props) =>{
    const [data,setData] = useState([]);
    const [page,setPage] = useState([]);
    const [nbpage,setNbpage] = useState([]);
    const ref = useRef(false);

    useEffect(()=>{
        const url = "http://spotify-api.local/Controller/API.php";
        axios.post(url,JSON.stringify({
            req : "getArtistsList",
        }))
        .then( async function(response) {
            await setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    },[]);

    useEffect(()=>{
        setNbpage( data.slice(0,Math.ceil(data.length / 50)));
        setPage(data.slice(0,20));
    },[data]);

    const pagination = (nb)=>{
        const first = (nb * 20);
        setPage(data.slice(first,(first + 20)));
    }

    const GoArtistPage = (nameArtist)=>{
        props.sendToReduxArtisteName(nameArtist);
        ref.current.click();
    }

    if(data.length !== 0){

        return (
            <>
                <Header/>
                <motion.div className="divMain" initial={{ y:"100vh"}} animate={{ y: 0}} exit={{y:"-150vh"}} transition={{ duration: 0.5, type: "spring" }}>
                    <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>Artistes</h4>
                    <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap",justifyContent:"center"}}>

                        {page.map((res)=>(
                            <div style={{margin:"10px",textAlign:"center"}}>
                                <motion.img initial={{scale:1}} whileHover={{scale:1.1,opacity:0.7,cursor:"pointer",marginBottom:"10px"}} src={res.photo} style={{width:"150px",height:"150px",objectFit:"cover",borderRadius:"50%"}}
                                    onClick={()=>GoArtistPage(res.name)}
                                />
                                <Link to="/ProfilArtist" ref={ref}/>
                                <h5> {res.name} </h5>
                                <p style={{opacity:"0.5"}}>Artiste</p>
                            </div>    
                        ))}
                    </div>
                    <motion.div style={{marginBottom:"5vh",border:"1px solid #4c0bd1",width:"50%",justifyContent:"center",marginLeft:"auto",marginRight:"auto",display:"flex",flexDirection:"rox",paddingBottom:"5px",paddingTop:"5px",borderRadius:"50px"}}
                        whileHover={{scale:1.1}}
                    >
                        {nbpage.map((data,i)=>(
                            <motion.p 
                             whileHover={{scale:1.5,cursor:"pointer",color:"#ee3ec9",opacity:1}} transition={{duration:0.2}} initial={{opacity:0.5,marginRight:"5px",marginLeft:"5px",scale:0.7}}
                             whileTap={{scale:0.9}}
                             onClick={()=>pagination(i)}
                             >{i}</motion.p>
                        ))}
                    </motion.div>
                </motion.div>
            </>
        );
    }else{
        return(
            <Chargement/>
        )
    }
}

function  mapDispatchToProps(dispatch){
    return{
        sendToReduxArtisteName : function(ArtistName){
            dispatch({type:"ArtistName",ArtistName:ArtistName})
        },
    }
}
export default connect(null,mapDispatchToProps)(Artiste);