import photographerFactory from "../factories/photographer.js";
import { MediaFactory } from "../factories/media.js";

const photographersId = new URL(location.href).searchParams.get("id");

const getData = async () =>
  await fetch("../../data/photographers.json").then((response) =>
    response.json()
  );

const displayPhotgrapherId = (photographers) => {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographFac = photographerFactory(photographers);
  const getPhotographCardDOM = photographFac.getPhotographCard();
  photographerHeader.innerHTML += getPhotographCardDOM;
};

const displayMedia = (media) => {
  const mediaExtends = document.querySelector(".media_container");
  mediaExtends.innerHTML = "";
  media.forEach((medias) => {
    const mediaModel = new MediaFactory(medias);
    const getMediaPicture = mediaModel.getMedia();
    mediaExtends.innerHTML += getMediaPicture;
  });
};

const lightboxModel = () => {
  const modal = document.querySelector("#lightbox_container");
  const cross = document.querySelector("#cross");
  const next = document.querySelector("#d");
  const prev = document.querySelector("#g");
  const header = document.querySelector(".titre");
  const article = document.querySelectorAll("article");
  const containerLightbox = document.querySelector(".media_container_lightbox");
  let count = 0;
  for (let i = 0; i < article.length; i++) {
    let media = article[i].querySelector("#easy");
    const title = article[i].querySelector(".title");
    

    media.addEventListener("click", function () {
      media = media.cloneNode(true); 
      modal.style.display = "block";
      containerLightbox.innerHTML = ""
      containerLightbox.appendChild(media);
      header.innerHTML = title.innerHTML;
      media.setAttribute("aria-label", header.innerHTML)
      count = i;
    });
    media.addEventListener("keyup", e => {
      if(e.key === "Enter"){
        media = media.cloneNode(true); 
        modal.style.display = "block";
        containerLightbox.innerHTML = ""
        containerLightbox.appendChild(media);
        header.innerHTML = title.innerHTML;
        media.setAttribute("aria-label", header.innerHTML)
        count = i;
      }
    });
  }
  cross.addEventListener("click", function () {
    modal.style.display = "none";
  });

  cross.addEventListener("keyup", e => {
      if(e.key === "Enter"){
        modal.style.display = "none"
      }

  });

  next.addEventListener("click", function () {
    if(count === article.length - 1){
        count = -1
    }
    let nextImg = article[count + 1].querySelector("#easy");
    nextImg = nextImg.cloneNode(true);
    containerLightbox.innerHTML=""
    containerLightbox.appendChild(nextImg);
    console.log(nextImg)
    const nextTitle = article[count + 1].querySelector("h2").innerHTML
    header.innerHTML = nextTitle
    count++
  });

  next.addEventListener("keyup", e => {
    if(e.key === "Enter"){
      if(count === article.length -1){
        count = -1;
      }
      let nextImg = article[count + 1].querySelector("#easy");
      nextImg = nextImg.cloneNode(true);
      containerLightbox.innerHTML=""
      containerLightbox.appendChild(nextImg);
      console.log(nextImg)
      const nextTitle = article[count + 1].querySelector("h2").innerHTML
      header.innerHTML = nextTitle
      count++

    }    
});

  prev.addEventListener("click", function(){
    if(count === 0){
      count = article.length
    }
      let prevImg = article[count - 1].querySelector("#easy");
      prevImg = prevImg.cloneNode(true);
      containerLightbox.innerHTML = ""
      containerLightbox.appendChild(prevImg);
      console.log(prevImg)
    const prevTitle = article[count - 1].querySelector("h2").innerHTML
    header.innerHTML = prevTitle
    count--
  })

  prev.addEventListener("keyup", e => {
    if(e.key === "Enter"){
      if(count === 0){
        count = article.length
      }
        let prevImg = article[count - 1].querySelector("#easy");
        prevImg = prevImg.cloneNode(true);
        containerLightbox.innerHTML = ""
        containerLightbox.appendChild(prevImg);
        console.log(prevImg)
      const prevTitle = article[count - 1].querySelector("h2").innerHTML
      header.innerHTML = prevTitle
      count--
    }
  })

};

const PriceFunc = (getPhoto) => {
  let price = document.querySelector(".prix");
  price.innerHTML += getPhoto.price + "€/jour";
};

const likeMedia = (likeTotal) => {
  let compteur = document.querySelectorAll(".like");
  const clique = document.querySelectorAll(".icon");
  let cumul = document.querySelector("span");
  cumul.innerHTML = likeTotal;

  for (let i = 0; i < clique.length; i++) {
    clique[i].addEventListener(
      "click",
    function () {
        if (compteur[i].innerHTML) {
         compteur[i].innerHTML++;
         cumul.innerHTML++;
         
        }
      },
      { once: true }
    );
  }
};
const triDonnee = (getId, likeTotal) => {
  const valeur = document.querySelector("select");
  valeur.addEventListener("change", function () {
    const selectedValue = valeur.options[this.selectedIndex].value;
    getId.sort(function (a, b) {
      if (selectedValue === "Titre") {
        return a.title.localeCompare(b.title);
      } else if (selectedValue === "Date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.likes - a.likes;
      }
    });
    displayMedia(getId);
    likeMedia(likeTotal);
    lightboxModel();
  });
};
const initId = async () => {
  const { photographers } = await getData();
  const getPhoto = photographers.find(
    (photographers) => photographers.id == photographersId
  );
  displayPhotgrapherId(getPhoto);
  PriceFunc(getPhoto); 
};

const init = async () => {
  initId();
  const { media } = await getData();
  console.log(media)
  const getId = media.filter(
    (media) => media.photographerId == photographersId
  );
  getId.sort(function (a, b) {
    return b.likes - a.likes;
  });
  const likeTotal = getId
    .map((med) => med.likes)
    .reduce((like, total) => (like += total));
  triDonnee(getId, likeTotal);
  displayMedia(getId);
  likeMedia(likeTotal);
  lightboxModel();
};
init();
