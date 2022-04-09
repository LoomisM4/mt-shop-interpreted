import React, {useEffect, useState} from 'react';
import {Button, Text, SafeAreaView, ScrollView, View} from "react-native";
import Api from "../util/Api";
import CartObj from "../objects/CartObj";
import AsyncImage from "./AsyncImage";

export default function Details({navigation, route}) {
    const [article, setArticle] = useState()

    useEffect(() => {
        navigation.setOptions({headerTitle: "Artikel"})
        Api.articlesAndDetails(route.params.url)
            .then(response => setArticle(response))
            .catch(error => console.log(Api.error))
    }, [])

    if (article === undefined) {
        return (
            <Text>Laden...</Text>
        )
    } else {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <ScrollView style={{flex: 1}} horizontal={true} nestedScrollEnabled>
                        {article._links.images.map(i => {
                            return (
                                <AsyncImage url={i.href} key={i.href}/>
                            )
                        })}
                    </ScrollView>
                    <Button title={"Zum Warenkorb hinzufügen"} onPress={() => addToCart(article)}/>
                    <Text style={{textAlign: "center", fontSize: 20, marginTop: 10}}>{article.name}</Text>
                    <Text style={{textAlign: "center", padding: 5}}>{article.description}</Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

function addToCart(article) {
    CartObj.cart.addArticle(article)
    console.log(CartObj.cart.articles.length)
}
