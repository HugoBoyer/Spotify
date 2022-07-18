import react, {useEffect,useState,useRef} from 'react'
import Header from "../Header";
import {motion} from "framer-motion";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const ResSearch = (props) => {
    const art = useRef(false);
    const alb = useRef(false);
    
    const [search,setSearch] = useState(props.Search)
    const [resAlbum,setResAlbum] = useState([]);
    const [resArtists,setResArtists] = useState([]);
    const [resTracks,setResTracks] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const url = "http://spotify-api.local/Controller/API.php";
            await axios.post(url,JSON.stringify({
                req : "Search",
                searchString : search,
            }))
            .then( async function(response){
                await setResAlbum(response.data.Albums);
                await setResArtists(response.data.Artists);
                await setResTracks(response.data.Tracks);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    },[search]);

    const ArtistGo = async (ArtisName)=>{
        await props.sendToReduxArtisteName(ArtisName);
        art.current.click();
    }
    const AlbumGo = async(AlbumName)=>{
        await props.sendToReduxAlbumName(AlbumName);
        alb.current.click();

    }
    if(resAlbum.length !== 0 || resArtists.length !== 0 || resTracks.length !== 0){
        return (
            <>
            <Header/>
            <motion.div className="divMain" initial={{ y:"100vh"}} animate={{y: 0}} exit={{y:"-450vh"}} transition={{ duration: 1, type: "spring" }}>
                <h1 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw",marginBottom:"2vh",marginTop:"2vh"}}>Resultat de votre recherche</h1>
            {resAlbum.length ?
            <>
                <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw"}}>Album</h4>
                <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                {resAlbum.map((res)=>(
                    <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                        <motion.img whileHover={{opacity:0.7}} src={res.cover_small} style={{border:"1px solid white",borderRadius:"15px",cursor:"pointer"}}
                             onClick={()=>AlbumGo(res.name)}
                        />
                        <h5>{res.name}</h5>
                        <Link to="/AlbumChoice" ref={alb}/>
                    </motion.div>
                ))}
                </div>
            </>
            : 
                <h5 style={{color: "#00c4cc",opacity:0.8,marginLeft:"1vw",marginBottom:"5vh",marginTop:"5vh"}}>Aucun Album pour votre recherche</h5> 
            }
                
    

            {resArtists.length ? 
            <>
                <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw",marginBottom:"2vh",marginTop:"2vh"}}>Artist</h4>
                <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                {resArtists.map((res)=>(
                    <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                        <motion.img whileHover={{opacity:0.7}} src={res.photo} style={{width:"150px",height:"150px",objectFit:"cover",borderRadius:"50%"}}
                            onClick={()=>ArtistGo(res.name)}
                        />
                        <h5 style={{textAlign:"center"}}>{res.name}</h5>
                        <Link to="/ProfilArtist" ref={art}/>
                    </motion.div>
                ))}
                </div>
            </>
            : 
                <h5 style={{color: "#00c4cc",opacity:0.8,marginLeft:"1vw",marginBottom:"5vh",marginTop:"5vh"}}>Aucun Artist pour votre recherche</h5> 
            }

        {resTracks.length ? 
            <>
                <h4 style={{color:"#ee3ec9",opacity:0.8,marginLeft:"1vw",marginBottom:"2vh",marginTop:"2vh"}}>Musique</h4>
                <div style={{margin:"0px 15px",display:"flex",flexDirection:"rox",overflowY: "hidden",overflowX: "auto",height:"auto",paddingTop:"10px"}}>
                {resTracks.map((res)=>(
                    <motion.div style={{marginRight:"25px"}} whileHover={{scale:1.1,x:10,marginTop:"10px",marginBottom:"10px",paddingRight:"10px"}} >
                        <div style={{textAlign:"center",cursor:"pointer"}}
                            onClick={()=>AlbumGo(res.album_name)}
                        >
                            <img src={res.cover_small} alt="cover samll" style={{width:"100px",height:"100px",objectFit:"cover",marginBottom:"5px"}}/>
                            <p style={{color:"#00c4cc"}}>{res.album_name}</p>
                        </div>
                        <p>{res.name}</p>
                        <Link to="/AlbumChoice" ref={alb}/>
                    </motion.div>
                ))}
                </div>
            </>
            : 
                <h5 style={{color: "#00c4cc",opacity:0.8,marginLeft:"1vw",marginBottom:"5vh",marginTop:"5vh"}}>Aucune musique pour votre recherche</h5> 
            }
            </motion.div>
        </>
        )
    }else{
        return(
            <>
                <Header/>
                <h1>Aucun Résultat</h1>
            </>
        )
    }
}
function mapStateToProps(state){
    return {Search: state.Search}
}
function  mapDispatchToProps(dispatch){
    return{
        sendToReduxArtisteName : function(ArtistName){
            dispatch({type:"ArtistName",ArtistName:ArtistName})
        },
        sendToReduxAlbumName : function(Album){
            dispatch({type:"Album",Album:Album})
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResSearch);
