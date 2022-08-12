export default function photographerFactory(data) {
    const { name, id, portrait, tagline, city, country, price } = data;

    class Photographer {
        constructor(data){
            this.name = data.name,
            this.country = data.country,
            this.city = data.city,
            this.tagline = data.tagline,
            this.price = data.price,
            this.id = data.id

        }
    }

    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        return    `
                <article>
                    <a href="photographer.html?id=${this.id}">
                        <img src ="${picture}" alt="Portrait de photographe">
                        <h2>${this.name}</h2>
                    </a>
                    <h3>${this.country}, ${this.city}</h3>
                    <p class="slogan">${this.tagline}</p>
                    <p class="tarif">${this.price}€/jour</p>
                </article>
                `
                
       }
    
       function getPhotographCard(){
        return `
        <div class="Photograph_detail">
            <h2>${this.name}</h2>
            <h3>${this.country}, ${this.city}</h3>
            <p>${this.tagline}</p>
        </div>
        <img src="${picture}" alt="Portait du photographe">
        `
       }

    
    return { name, id, picture, tagline, city, country, price, getUserCardDOM,getPhotographCard}
}
