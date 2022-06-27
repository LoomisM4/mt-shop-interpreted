import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import Api from "../util/Api";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ArticleList from "./ArticleList";
import Details from "./Details";

function Categories({route, navigation}) { // 1
    const [categories, setCategories] = useState([]) // 2

    useEffect(() => { // 1
        navigation.setOptions({headerTitle: "Kategorien"}) // 2
        let url; // 0
        if (route.params !== undefined) { // 3
            url = route.params.url // 3
            if (route.params.title !== undefined) { // 4
                navigation.setOptions({headerTitle: route.params.title}) // 4
            }
        }
        Api.categories(url) // 1
            .then(response => setCategories(response._embedded.categories)) // 4
    }, [])

    if (categories.length === 0) { // 3
        return ( // 1
            <Text>Laden...</Text> // 1
        )
    } else { // 1
        return ( // 1
            <FlatList
                data={categories}
                renderItem={({item}) => {
                    if (item._links.subcategories !== undefined) { // 4
                        return <TouchableHighlight onPress={() => navigation.push("KategorienStack", {url: item._links.subcategories.href, title: item.name})} key={item.name}> <!-- 12 -->
                            <View> <!-- 1 -->
                                <Text style={{fontSize: 25, marginBottom: 10, paddingLeft: 5}}>{item.name}</Text> <!-- 6 -->
                            </View>
                        </TouchableHighlight>
                    } else if (item._links.articles !== undefined) { // 4
                        return <TouchableHighlight onPress={() => navigation.push("List", {url: item._links.articles.href, title: item.name})} key={item.name}> <!-- 12 -->
                            <View> <!-- 1 -->
                                <Text style={{fontSize: 25, marginBottom: 10, paddingLeft: 5}}>{item.name}</Text> <!-- 6 -->
                            </View>
                        </TouchableHighlight>
                    }
                }}
            /> <!-- 3 -->
        )
    }
}

export default function CategoriesStack() { // 1
    const Stack = createNativeStackNavigator(); // 2

    return ( // 1
        <Stack.Navigator> <!-- 1 -->
            <Stack.Screen name={"KategorienStack"} component={Categories}/> <!-- 3 -->
            <Stack.Screen name={"List"} component={ArticleList}/> <!-- 3 -->
            <Stack.Screen name={"Article"} component={Details}/> <!-- 3 -->
        </Stack.Navigator>
    )
}

// 95
