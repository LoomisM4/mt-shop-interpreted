import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableHighlight, View} from "react-native";
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
            .then(response => setCategories(response._embedded.categories))
            .catch(error => console.log(Api.error))
    }, [])

    if (categories.length === 0) {
        return (
            <Text>Laden...</Text>
        )
    } else {
        return (
            <FlatList
                data={categories}
                renderItem={({item}) => {
                    if (item._links.subcategories !== undefined) {
                        return <TouchableHighlight onPress={() => navigation.push("KategorienStack", {url: item._links.subcategories.href, title: item.name})} key={item.name}>
                            <View>
                                <Text style={{fontSize: 25, marginBottom: 10, paddingLeft: 5}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    } else if (item._links.articles !== undefined) {
                        return <TouchableHighlight onPress={() => navigation.push("List", {url: item._links.articles.href, title: item.name})} key={item.name}>
                            <View>
                                <Text style={{fontSize: 25, marginBottom: 10, paddingLeft: 5}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                }}
            />
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
