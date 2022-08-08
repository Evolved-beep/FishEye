export default function photographerFactory(data) {
    const { name, id, portrait, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const clique = document.createElement("a");
        clique.setAttribute("href", "photographer.html" + `?id=${id}`)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait des photographes")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const place = document.createElement("h3")
        place.textContent = `${city}, ${country}` 
        const devise = document.createElement('p');
        devise.setAttribute("class", "slogan")
        devise.textContent = tagline
        const prix = document.createElement('p');
        prix.setAttribute("class", "tarif");
        prix.textContent = `${price}€/jour`;
        clique.appendChild(img);
        clique.appendChild(h2)
        article.appendChild(clique);
        article.appendChild(place);
        article.appendChild(devise);
        article.appendChild(prix)
        return (article);
    }

    function getPhotographCard(){
        const blab = document.createElement('h1');
        blab.textContent = name
        return(blab)

    }
    return { name, id, picture, tagline, city, country, price, getUserCardDOM, getPhotographCard}
}
