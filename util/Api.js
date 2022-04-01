import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Api {
    static baseUrl = "https://shop.marcelwettach.eu";
    static error = "Fehler beim Laden der Daten"
    static cache = new Cache({
        namespace: "shopCache",
        policy: {
            maxEntries: 50000,
            stdTTL: 0
        },
        backend: AsyncStorage
    });
    static online = true // TODO

    static spotlight() {
        let url = Api.baseUrl + "/spotlight"
        return Api.fetchOrCache(url)
    }

    static articlesAndDetails(url) {
        return Api.fetchOrCache(url)
    }

    static categories(url) {
        let urlNew;
        if (url === undefined) {
            urlNew = Api.baseUrl + "/categories"
        } else {
            urlNew = url
        }
        return Api.fetchOrCache(urlNew)
    }

    static image(url) {
        if (Api.online) {
            return fetch(url)
                .then(response => response.blob())
                .then(blob => new Promise(callback => {
                    let reader = new FileReader() ;
                    reader.onload = function(){
                        console.log("caching")
                        Api.cache.set(url, this.result)
                        callback(this.result)
                    } ;
                    reader.readAsDataURL(blob) ;
                }));
        } else {
            console.log("serving from cache")
            return Api.cache.get(url)
        }
    }

    static fetchOrCache(url) {
        if (Api.online) {
            return fetch(url)
                .then(response => response.json())
                .then(json => {
                    console.log("caching")
                    Api.cache.set(url, json)
                    return Promise.resolve(json)
                })
        } else {
            console.log("serving from cache")
            return Api.cache.get(url)
        }
    }
}
