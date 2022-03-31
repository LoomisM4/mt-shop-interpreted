import React, {useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import Api from "../util/Api";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ArticleList from "./ArticleList";
import Details from "./Details";

function Categories({route, navigation}) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        navigation.setOptions({headerTitle: "Kategorien"})
        let url;
        if (route.params !== undefined) {
            url = route.params.url
            if (route.params.title !== undefined) {
                navigation.setOptions({headerTitle: route.params.title})
            }
        }
        Api.categories(url)
            .then(response => response.json())
            .then(response => setCategories(response._embedded.categories))
            .catch(error => console.log(Api.error))
    }, [])

    if (categories.length === 0) {
        return (
            <Text>Laden...</Text>
        )
    } else {
        return (
            categories.map(c => {
                if (c._links.subcategories !== undefined) {
                    return (
                        <View key={c.categoryId}>
                            <TouchableHighlight onPress={() => navigation.push("KategorienStack", {url: c._links.subcategories.href, title: c.name})} key={c.name}>
                                <View>
                                    <Text>{c.name}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                } else if (c._links.articles !== undefined) {
                    return (
                        <View key={c.categoryId}>
                            <TouchableHighlight onPress={() => navigation.push("List", {url: c._links.articles.href, title: c.name})} key={c.name}>
                                <View>
                                    <Text>{c.name}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                }
            })
        )
    }
}

export default function CategoriesStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={"KategorienStack"} component={Categories}/>
            <Stack.Screen name={"List"} component={ArticleList}/>
            <Stack.Screen name={"Article"} component={Details}/>
        </Stack.Navigator>
    )
}
