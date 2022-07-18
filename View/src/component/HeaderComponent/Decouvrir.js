import React, { useEffect,useState ,useRef} from 'react';
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import Header from "../Header";
import Chargement from "../Chargement";
import axios from 'axios';
import "../Style/Decouvrir.css";
import {connect} from 'react-redux';

const Decouvrir = (props)=> {
    const album = useRef(false);
    const [genre,setGenre] = useState([]);
    const [allAlbums,setAllAlbums] = useState([]);
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const url = "http://spotify-api.local/Controller/API.php";
    
            await axios.post(url,JSON.stringify({
                req : "getDiscoverPage",
            }))
            .then( async function(response){
                let tab_genre = [];
                let tab_album = [];
                for(var i = 0; i< response.data.length; i++){
                    tab_genre.push(response.data[i].name);
                    tab_album.push(response.data[i].albums);
                }
                setGenre(tab_genre);
                setAllAlbums(tab_album);
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        fetchData();
    },[]);

    const AlbumGo = (AlbumName) =>{
        props.sendToReduxAlbumName(AlbumName);
       album.current.click();
    }

    if(genre.length !== 0 && allAlbums.length !== 0){
        return (   
                <>
                        <Header/>
                        <motion.div className="divMain" initial={{ y:"100vh"}} animate={{ y: 0}} exit={{y:"-300vh"}} transition={{ duration: 0.5, type: "spring" }}>
                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[0]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[0].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[1]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[1].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[2]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[2].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[3]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[3].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[4]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[4].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[5]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[5].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[6]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[6].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[7]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[7].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[8]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[8].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>

                            <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>{genre[9]}</h4>
                            <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                            {allAlbums[9].map((res)=>(
                            <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                                    <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                                        onClick={()=>AlbumGo(res.name)}
                                    />
                                    <Link to="/AlbumChoice" ref={album}/>
                                    <h5>{res.name}</h5>
                            </motion.div>
                            ))}
                            </div>
                        </motion.div>
                    </>
        );
    }else{
        return(
            <Chargement />
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
export default connect(null,mapDispatchToProps)(Decouvrir);