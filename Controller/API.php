<?php
include_once("../Model/bdd.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(trim(file_get_contents("php://input")),true);
$db = new database();

if(isset($_POST["req"])){
    if($_POST["req"] == "getArtistsList"){
        $data = $db->getArtistsList();
        echo json_encode($data);
    }
    if($_POST["req"] == "getArtistDetail" && isset($_POST["artist"])){
        $data = $db->getArtistDetail($_POST["artist"]);
        echo json_encode($data);
    }
    if($_POST["req"] == "getAlbumsList"){
        $data = $db->getAlbumsList();
        echo json_encode($data);
    }
    if($_POST["req"] == "getAlbumDetailsAndTracks" && isset($_POST["album"])){
        $data = $db->getAlbumDetailsAndTracks($_POST["album"]);
        echo json_encode($data);
    }
    if($_POST["req"] == "getAlbumsFromArtist" && isset($_POST["artist"])){
        $data = $db->getAlbumsFromArtist($_POST["artist"]);
        echo json_encode($data);
    }
    if($_POST["req"] == "getTrackDetails" && isset($_POST["track"])){
        $data = $db->getTrackDetails($_POST["track"]);
    }
    if($_POST["req"] == "getGenresList"){
        $data = $db->getGenresList();
        echo json_encode($data);
    }

    if($_POST["req"] == "getAlbumsFromGenre" && isset($_POST["genre"])){
        $data = $db->getAlbumsFromGenre($_POST["genre"]);
        echo json_encode($data);
    }

    if($_POST["req"] == "getDiscoverPage"){
        $data = $db->getGenresList();
        foreach ($data as $key => $value) {
            $albums = $db->getAlbumsFromGenre($value["id"]);
            $data[$key]["albums"] = $albums;
        }
        echo json_encode($data);
    }
    if($_POST["req"] == "Search" && isset($_POST["searchString"])){
        $dataArtists = $db->searchInArtists($_POST["searchString"]);
        $dataAlbums = $db->searchInAlbums($_POST["searchString"]);
        $dataTracks = $db->searchInTracks($_POST["searchString"]);
        $data["Artists"] = $dataArtists;
        $data["Albums"] = $dataAlbums;
        $data["Tracks"] = $dataTracks;
        echo json_encode($data);
    }
}

