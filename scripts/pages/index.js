    import photographerFactory from "../factories/photographer.js"
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        try {
        let response = await fetch("../../data/photographers.json");
            if(response.ok){
                let json = await response.json();
                return json;
        }
        } catch(err){
            console.error(err);
        }
        return ({
            photographers: [ ...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    init();
    