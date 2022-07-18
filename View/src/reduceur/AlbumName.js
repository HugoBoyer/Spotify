export default function(Album = "",action){
    if(action.type == "Album"){
        var newAlbum = action.Album;
        return newAlbum;
    }else{
        return Album;
    }
}