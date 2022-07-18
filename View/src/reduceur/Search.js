export default function(search = "",action){
    if(action.type === "search"){
        let newSearch = action.Search;
        return newSearch;
    }else{
        return search;
    }
}