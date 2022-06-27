import React, {useEffect, useState} from 'react';
import {Button, Text, SafeAreaView, ScrollView, View} from "react-native";
import Api from "../util/Api";
import CartObj from "../objects/CartObj";
import AsyncImage from "./AsyncImage";

export default function Details({navigation, route}) { // 1
    const [article, setArticle] = useState() // 2

    useEffect(() => { // 1
        navigation.setOptions({headerTitle: "Artikel"}) // 2
        Api.articlesAndDetails(route.params.url) // 3
            .then(response => setArticle(response)) // 2
    }, [])

    if (article === undefined) { // 2
        return ( // 1
            <Text>Laden...</Text> // 1
        )
    } else { // 1
        return ( // 1
            <SafeAreaView style={{flex: 1}}> <!-- 3 -->
                <ScrollView style={{flex: 1}}> <!-- 3 -->
                    <ScrollView style={{flex: 1}} horizontal={true} nestedScrollEnabled> <!-- 5 -->
                        {article._links.images.map(i => { // 3
                            return ( // 1
                                <AsyncImage url={i.href} key={i.href}/> <!-- 5 -->
                            )
                        })}
                    </ScrollView>
                    <Button title={"Zum Warenkorb hinzufügen"} onPress={() => addToCart(article)}/> <!-- 4 -->
                    <Text style={{textAlign: "center", fontSize: 20, marginTop: 10}}>{article.name}</Text> <!-- 6 -->
                    <Text style={{textAlign: "center", padding: 5}}>{article.description}</Text> <!-- 5 -->
                </ScrollView>
            </SafeAreaView>
        )
    }
}

function addToCart(article) { // 1
    CartObj.cart.addArticle(article) // 2
}

// 55
