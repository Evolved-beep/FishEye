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
                    <a href="photographer.html?id=${this.id}" aria-label="${this.name}">
                        <img src ="${picture}">
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
        <div class="Photograph_detail" tabindex="2">
            <h2>${this.name}</h2>
            <h3>${this.country}, ${this.city}</h3>
            <p>${this.tagline}</p>
        </div>
        <img src="${picture}" aria-label="${this.name}" tabindex="4">
        `
       }

    
    return { name, id, picture, tagline, city, country, price, getUserCardDOM,getPhotographCard}
}
