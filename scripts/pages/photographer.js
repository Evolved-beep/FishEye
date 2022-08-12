import photographerFactory from "../factories/photographer.js"
import MediaFactory from "../factories/media.js";

const photographersId = new URL(location.href).searchParams.get("id");

const getData = async() => 
        await fetch("../../data/photographers.json")
        .then(response => response.json())
        
const displayPhotgrapherId = (photographers) => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographFac = photographerFactory(photographers);
    const getPhotographCardDOM = photographFac.getPhotographCard()
    photographerHeader.innerHTML += getPhotographCardDOM
}

const displayMedia = (media) => {
    const mediaExtends = document.querySelector(".media_container");
    media.forEach((medias) => {
        const mediaModel = MediaFactory(medias);
        const getMediaPicture = mediaModel.getMedia();
        mediaExtends.innerHTML += getMediaPicture
    });
}

const initId = async() => {
    const {photographers} = await getData();
    const getId =  photographers.find(photographers => photographers.id == photographersId) 
    console.log(getId)
    displayPhotgrapherId(getId);
}
initId()

const mediaInit = async () => {
    const {media} = await getData();
    const getId = media.filter(media => media.photographerId == photographersId) 
    displayMedia(getId);
}
mediaInit()
.then (e => {
    let compteur = document.querySelectorAll(".like");
    const clique = document.querySelectorAll(".icon");
    clique.forEach((cliques) => {
    compteur.forEach((compteurs) => {
        cliques.addEventListener("click", function(){
            let nbr = parseInt(compteurs.innerHTML);
            nbr = nbr + 1
            return compteurs.innerHTML = nbr
        })
       
    })
    })
    
})

/*  */





