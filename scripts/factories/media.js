export class MediaFactory {
    constructor(data) {
        if (data.hasOwnProperty('image')) {
            return new Image(data)
        } else if (data.hasOwnProperty('video')) {
            return new Video(data)
        } else {
            throw 'Unknown type format'
        }
    }

 }

class Image {
    constructor(data){
        this.title = data.title,
        this.likes = data.likes,
        this.photographerId = data.photographerId,
        this.image = data.image
    }
    getMedia(){
        return `
                    <article>
                    <img id="easy" src="../../assets/${this.photographerId}/${this.image}" aria-label="${this.title}" alt="${this.title} "tabindex="6">
                        <div class="description">
                            <h2 class="title">${this.title}</h2>
                            <div class="compteur" tabindex="6">
                                <p class="like">${this.likes}</p>
                                <i class="fa-solid fa-heart icon"></i>
                            </div>
                        </div>
                    </article>
                    `

    }
    
}
class Video {
    constructor(data) {
        this.title = data.title,
        this.likes = data.likes,
        this.video = data.video,
        this.photographerId = data.photographerId
    }
    getMedia(){
        return `
                    <article>
                        <video width="300" id="easy" aria-label="${this.title}" tabindex="6" controls>
                        <source src="../../assets/${this.photographerId}/${this.video}" type="video/mp4" alt="${this.title}">
                        </video>
                        <div class="description">
                            <h2 class="title">${this.title}</h2>
                            <div class="compteur" tabindex="6">
                                <p class="like">${this.likes}</p>
                                <i class="fa-solid fa-heart icon"></i>
                            </div>
                        </div>
                    </article>
                    `
    }
}
