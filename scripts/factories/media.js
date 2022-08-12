export default function MediaFactory(data){
    const {id,photographId,title,image,likes,date,price} = data;
    const {name} = data
    
    class PhotographerMedia {
        constructor(data){
            this.id = data.id,
            this.photographId = data.photographId,
            this.title = data.title,
            this.image = data.image,
            this.likes = data.likes,
            this.date = data.date,
            this.price = data.price
        }
    }  
    const picture = `assets/photographers-image/${image}`; 
    
    function getMedia(){
        return `
                    <article>
                            <a>
                                <img src="${picture}">
                            </a>
                            <div class="description">
                                <h2>${this.title}</h2>
                                <div class="compteur">
                                    <p class="like">${this.likes}</p>
                                    <i class="fa-solid fa-heart icon"></i>
                                </div>
                        </div>
                    </article>
                    `

    }

    function getLightbox(){
        return `
        <div class="container">
        <i class="fa-solid fa-chevron-left"></i>
        <i class="fa-solid fa-chevron-right"></i>
        </div>
        `
    }

    return {id, photographId, title, image, likes, date, price, name, picture, getMedia, getLightbox}
}