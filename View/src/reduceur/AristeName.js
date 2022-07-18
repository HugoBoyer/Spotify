export default function(ArtisteName = "",action){
    if(action.type == "ArtistName"){
        var newArtisteName = action.ArtistName;
        return newArtisteName;
    }else{
        return ArtisteName;
    }
}