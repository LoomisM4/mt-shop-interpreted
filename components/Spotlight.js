import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, TouchableHighlight} from "react-native";
import Api from "../util/Api";
import AsyncImage from "./AsyncImage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Details from "./Details";

function Spotlight({navigation}) { // 1
    const [articles, setArticles] = useState([]) // 2

    useEffect(() => { // 1
        navigation.setOptions({headerTitle: "Spotlight"}) // 2
        Api.spotlight() // 1
            .then(response => setArticles(response._embedded.articles)) // 4
    }, [])

    return ( // 1
        <SafeAreaView style={{flex: 1}}> <!-- 3 -->
                <ScrollView style={{flex: 1}}> <!-- 3 -->
                    {articles.map(a => { // 1
                        return ( // 1
                            <TouchableHighlight key={a.id} onPress={() => navigation.push("Article", {url: a._links.details.href})}> <!-- 9 -->
                                <AsyncImage url={a._links.spotlightImage.href}/> <!-- 5 -->
                            </TouchableHighlight>
                        )
                    })}
                </ScrollView>
        </SafeAreaView>
    )
}

export default function SpotlightStack() { // 1
    const Stack = createNativeStackNavigator() // 2

    return ( // 1
        <Stack.Navigator style={{flex: 1}}> <!-- 3 -->
            <Stack.Screen name={"SpotlightStack"} component={Spotlight}/> <!-- 3 -->
            <Stack.Screen name={"Article"} component={Details}/> <!-- 3 -->
        </Stack.Navigator>
    )
}

// 47
