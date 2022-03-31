import React, {useEffect, useState} from 'react';
import {Button, Text, SafeAreaView, ScrollView, View} from "react-native";
import Api from "../util/Api";
import CartObj from "../objects/CartObj";
import AsyncImage from "./AsyncImage";

export default function Details({navigation, route}) {
    const [article, setArticle] = useState()

    useEffect(() => {
        navigation.setOptions({headerTitle: "Artikel"})
        Api.details(route.params.url)
            .then(response => response.json())
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
                    <Text>{article.name}</Text>
                    <Text>{article.description}</Text>
                    <Button title={"Zum Warenkorb hinzufügen"} onPress={() => addToCart(article)}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

function addToCart(article) {
    CartObj.cart.addArticle(article)
    console.log(CartObj.cart.articles.length)
}
