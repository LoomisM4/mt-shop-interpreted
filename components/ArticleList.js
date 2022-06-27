import React, {useEffect, useState} from 'react';
import Api from "../util/Api";
import {Text, SafeAreaView, ScrollView, TouchableHighlight, View} from "react-native";
import AsyncImage from "./AsyncImage";

export default function ArticleList({route, navigation}) { // 1
    const [articles, setArticles] = useState([]) // 2

    useEffect(() => { // 1
        if (route.params !== undefined && route.params.title != undefined) { // 7
            navigation.setOptions({headerTitle: route.params.title}) // 4
        }
        Api.articlesAndDetails(route.params.url) // 3
            .then(response => { // 1
                setArticles(response._embedded.articles) // 3
            })
    }, [])

    if (articles.length === 0) { // 3
        return ( // 1
            <Text>Laden...</Text> // 1
        )
    } else { // 1
        return ( // 1
            <SafeAreaView> <!-- 1 -->
                <ScrollView> <!-- 1 -->
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}> <!-- 4 -->
                        {articles.map(a => ( // 1
                            <TouchableHighlight key={a.id}
                                                onPress={() => navigation.push("Article", {url: a._links.details.href})}> <!-- 9 -->
                                <View> <!-- 1 -->
                                    <AsyncImage url={a._links.preview.href} width={0.5}/> <!-- 6 -->
                                </View>
                            </TouchableHighlight>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

// 54
