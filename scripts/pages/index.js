    import photographerFactory from "../factories/photographer.js"
     const displayData = (photographers) => {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            console.log(photographers)
            const userCardDOM = photographerModel.getUserCardDOM()
            photographersSection.innerHTML += userCardDOM;
        });
    }; 

    const getData = async() => 
        await fetch("../../data/photographers.json")
        .then(response => response.json())

     const init = async() => {
        // Récupère les datas des photographes
        const {photographers} = await getData()
        console.log(photographers)
         displayData(photographers); 
     }
    init();
     