import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Api { // 1
    static baseUrl = "https://shop.marcelwettach.eu"; // 1
    static error = "Fehler beim Laden der Daten" // 1
    static cache = new Cache({ // 2
        namespace: "shopCache", // 1
        policy: { // 1
            maxEntries: 50000, // 1
            stdTTL: 0 // 1
        },
        backend: AsyncStorage // 1
    });

    static async spotlight() { // 1
        let url = Api.baseUrl + "/spotlight" // 3
        return Api.fetchOrCache(url) // 2
    }

    static async articlesAndDetails(url) { // 1
        return Api.fetchOrCache(url) // 2
    }

    static async categories(url) { // 1
        let urlNew; // 0
        if (url === undefined) { // 2
            urlNew = Api.baseUrl + "/categories" // 3
        } else { // 1
            urlNew = url // 1
        }
        return Api.fetchOrCache(urlNew) // 2
    }

    static async image(url) { // 1
        let response = await fetch(url) // 2

        if (response.status === 200) { // 3
            return response.blob() // 2
                .then(blob => new Promise(callback => { // 2
                    let reader = new FileReader() ; // 2
                    reader.onload = function(){ // 2
                        console.log("caching") // 0
                        Api.cache.set(url, this.result) // 3
                        callback(this.result) // 2
                    } ;
                    reader.readAsDataURL(blob) ; // 1
                }));
        } else { // 1
            console.log("serving from cache") // 0
            return Api.cache.get(url) // 3
        }
    }

    static async fetchOrCache(url) { // 1
        let response = await fetch(url); // 2

        if (response.status === 200) { // 3
            return response.json() // 2
                .then(json => { // 1
                    console.log("caching") // 0
                    Api.cache.set(url, json) // 2
                    return Promise.resolve(json) // 2
                })
        } else { // 1
            console.log("serving from cache") // 0
            return Api.cache.get(url) // 3
        }
    }
}

// 70
