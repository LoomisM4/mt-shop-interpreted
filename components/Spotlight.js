import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, TouchableHighlight} from "react-native";
import Api from "../util/Api";
import AsyncImage from "./AsyncImage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Details from "./Details";

function Spotlight({navigation}) {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        navigation.setOptions({headerTitle: "Spotlight"})
        Api.spotlight()
            .then(response => response.json())
            .then(response => setArticles(response._embedded.articles))
            .catch(() => console.log(Api.error))
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    {articles.map(a => {
                        return (
                            <TouchableHighlight key={a.id} onPress={() => navigation.push("Article", {url: a._links.details.href})}>
                                <AsyncImage url={a._links.spotlightImage.href}/>
                            </TouchableHighlight>
                        )
                    })}
                </ScrollView>
        </SafeAreaView>
    )
}

export default function SpotlightStack() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator style={{flex: 1}}>
            <Stack.Screen name={"SpotlightStack"} component={Spotlight}/>
            <Stack.Screen name={"Article"} component={Details}/>
        </Stack.Navigator>
    )
}
