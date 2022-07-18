import {Routes,Route,useLocation} from 'react-router-dom';
import Home from "./component/Home";
import Decouvrir from "./component/HeaderComponent/Decouvrir";
import Artistes from "./component/HeaderComponent/Artiste";
import Albums from "./component/HeaderComponent/Album";
import PlayList from "./component/HeaderComponent/PlayList";
import ProfilArtist from "./component/InfosComponent/ProfilArtist";
import AlbumChoice from "./component/InfosComponent/AlbumChoice";
import ResSearch from "./component/InfosComponent/ResSearch";
import {AnimatePresence} from "framer-motion";
function App() {
  const location = useLocation();
  return (
      <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/Decouvrir" element={<Decouvrir/>}/>
            <Route path="/Artistes" element={<Artistes/>}/>
            <Route path="/Albums" element={<Albums/>}/>
            <Route path="/PlayList" element={<PlayList/>}/>
            <Route path="/ProfilArtist" element={<ProfilArtist/>}/>
            <Route path="/AlbumChoice" element={<AlbumChoice/>}/>
            <Route path="/Search" element={<ResSearch/>} />
            <Route path="*" element={<Home/>}/>
          </Routes>
      </AnimatePresence>
  );
}

export default App;