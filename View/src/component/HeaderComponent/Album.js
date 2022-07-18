import React, {useEffect,useRef,useState} from 'react';
import Header from "../Header";
import Chargement from "../Chargement";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import axios from 'axios';
import {connect} from 'react-redux';

const Album = (props)=> {

    const album = useRef(false);
    const [data,setData] = useState([]);
    const [page,setPage] = useState([]);
    const [nbpage,setNbpage] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const url = "http://spotify-api.local/Controller/API.php";
            await axios.post(url,JSON.stringify({
                req : "getAlbumsList",
            }))
            .then(async function(response){
                await setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    },[]);

    useEffect(()=>{
        setNbpage( data.slice(0,Math.ceil(data.length / 50)));
        setPage(data.slice(0,20));
    },[data]);

    const pagination = (nb)=>{
        const first = (nb * 20);
        setPage(data.slice(first,(first + 20)));
    }
    const registerAlbum = (AlbumName)=>{
        props.sendToReduxAlbumName(AlbumName);
        album.current.click();
    }

    if(nbpage.length !== 0 && page.length !== 0 && data.length !== 0){

        return (
            <>
                <Header/>
                <motion.div className="divMain" initial={{ y:"100vh"}} animate={{ y: 0}} exit={{y:"-500vh"}} transition={{ duration: 0.5, type: "spring" }}>
                    <div style={{margin:"15px 15px",display:"flex",flexDirection:"row",paddingTop:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                    {page.map((res)=>(
                    <motion.div style={{marginRight:"25px",textAlign:"center"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                            <motion.img whileHover={{opacity:0.7}} src={res.cover} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer",width:"300px"}}
                                onClick={()=>registerAlbum(res.name)}
                            />
                            <Link to="/AlbumChoice" ref={album}/>
                            <h5 style={{marginBottom:"20px"}}>{res.name}</h5>
                    </motion.div>
                    ))}
                    </div>
    
                    <motion.div style={{marginBottom:"5vh",border:"1px solid #4c0bd1",justifyContent:"center",marginLeft:"auto",marginRight:"auto",display:"flex",flexDirection:"rox",paddingBottom:"5px",paddingTop:"5px",borderRadius:"50px",width:'90%'}}
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
export default connect(null,mapDispatchToProps)(Album);