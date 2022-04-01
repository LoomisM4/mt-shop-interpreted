import React, {useEffect, useState} from 'react';
import Api from "../util/Api";
import {Text, SafeAreaView, ScrollView, TouchableHighlight, View} from "react-native";
import AsyncImage from "./AsyncImage";

export default function ArticleList({route, navigation}) {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        if (route.params !== undefined && route.params.title != undefined) {
            navigation.setOptions({headerTitle: route.params.title})
        }
        Api.articlesAndDetails(route.params.url)
            .then(response => {
                setArticles(response._embedded.articles)
            })
            .catch(error => console.log(Api.error))
    }, [])

    if (articles.length === 0) {
        return (
            <Text>Laden...</Text>
        )
    } else {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {articles.map(a => (
                            <TouchableHighlight key={a.id}
                                                onPress={() => navigation.push("Article", {url: a._links.details.href})}>
                                <View>
                                    <AsyncImage url={a._links.preview.href} width={0.5}/>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
