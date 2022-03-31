export default class Api {
    static baseUrl = "https://shop.marcelwettach.eu";
    static error = "Fehler beim Laden der Daten"

    static spotlight() {
        return fetch(Api.baseUrl + "/spotlight")
    }

    static details(url) {
        return fetch(url)
    }

    static categories(url) {
        if (url === undefined) {
            return fetch(Api.baseUrl + "/categories")
        } else {
            return fetch(url)
        }
    }

    static articles(url) {
        return fetch(url)
    }

    static image(url) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise(callback => {
                let reader = new FileReader() ;
                reader.onload = function(){ callback(this.result) } ;
                reader.readAsDataURL(blob) ;
            }));
    }
}
