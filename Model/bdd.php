<?php
class database{
    function __construct(){
        try{
            $this->db = new PDO('mysql:host=65.108.127.22:3306;dbname=my_spotify_db','spotify','7552JLq4xwnJYi1D');
        }catch(Exception $e){
            die('Erreur'.$e->getMessage());
        }
    }
    function getArtistsList(){
        $data = $this->db->prepare("select name,photo from artists");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getArtistDetail($artistName){
        $data = $this->db->prepare("select name,description,bio,photo from artists where name = '$artistName'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getAlbumsList(){
        $data = $this->db->prepare("select name,cover,cover_small from albums");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getAlbumDetailsAndTracks($album){
        $data = $this->db->prepare("select artists.name as 'artist_name' ,albums.artist_id,albums.name,albums.cover,albums.cover_small,albums.description,albums.release_date,albums.popularity from albums inner join artists on albums.artist_id = artists.id where albums.name = '$album' ");
        $data->execute();
        $data = $data->fetchAll(PDO::FETCH_ASSOC);
        $tracks = $this->db->prepare("select tracks.name,tracks.duration,tracks.mp3 from tracks inner join albums on tracks.album_id = albums.id where albums.name = '$album'");
        $tracks->execute();
        $tracks = $tracks->fetchAll(PDO::FETCH_ASSOC);
        $data["tracks"] = $tracks;
        return $data;
    }
    function getAlbumsFromArtist($artist){
        $data = $this->db->prepare("select albums.name,albums.cover_small from artists inner join albums on artists.id = albums.artist_id where artists.name = '$artist'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getTrackDetails($track){
        $data = $this->db->prepare("select tracks.name,tracks.duration,tracks.mp3 from tracks where tracks.name = '$track'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getGenresList(){   
        $data = $this->db->prepare("select id,name from genres");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function getAlbumsFromGenre($genreId){
        $data = $this->db->prepare("select albums.name,albums.cover_small from albums right join genres_albums on albums.id = genres_albums.album_id where genres_albums.genre_id = '$genreId'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    
    function searchInArtists($string){
        $data = $this->db->prepare("select name,description,bio,photo from artists where name like '%$string%'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function searchInAlbums($string){
        $data = $this->db->prepare("select name,description,cover,cover_small,release_date,popularity from albums where name like '%$string%'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
    function searchInTracks($string){
        $data = $this->db->prepare("select albums.name as 'album_name',albums.cover_small,tracks.name,tracks.duration from tracks left join albums on albums.id = tracks.album_id where tracks.name like '%$string%'");
        $data->execute();
        return $data->fetchAll(PDO::FETCH_ASSOC);
    }
}