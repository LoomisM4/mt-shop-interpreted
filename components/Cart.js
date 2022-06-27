import React, {useEffect, useState} from 'react';
import {View, Button, Text, SafeAreaView, TouchableHighlight, Alert} from "react-native";
import CartObj from "../objects/CartObj";

export default function Cart() { // 1
    const [articles, setArticles] = useState(CartObj.cart.articles) // 4
    const [flag, setFlag] = useState(true) // 2

    useEffect(() => { // 1
        setArticles(CartObj.cart.articles) // 3
        forceRedraw() // 1
    }, [])

    if (articles.length > 0) { // 3
        return ( // 1
            <SafeAreaView> <!-- 1 -->
                {articles.map(cartArticle => ( // 1
                    <View key={cartArticle.article.id} style={{flexDirection: "row"}}> <!-- 6 -->
                        <Text style={{flex: 1, fontSize: 20}}>{cartArticle.article.name}</Text> <!-- 6 -->
                        <View style={{flex: 1, flexDirection: "row"}}> <!-- 4 -->
                            <TouchableHighlight onPress={() => less(cartArticle)}> <!-- 3 -->
                                <Text style={{fontSize: 20, marginRight: 30}}>-</Text> <!-- 4 -->
                            </TouchableHighlight>
                            <Text style={{fontSize: 20}}>{cartArticle.quantity}</Text> <!-- 4 -->
                            <TouchableHighlight onPress={() => more(cartArticle)}> <!-- 3 -->
                                <Text style={{fontSize: 20, marginLeft: 30}}>+</Text> <!-- 4 -->
                            </TouchableHighlight>
                        </View>
                        <Text style={{fontSize: 20}}>{cartArticle.getPositionPrice().toFixed(2)}</Text> <!-- 5 -->
                    </View>
                ))}
                <Text style={{fontSize: 20}}>Preis: {CartObj.cart.getTotalPrice().toFixed(2)}</Text> <!-- 6 -->
                <Button title={"Zahlungspflichtig bestellen"} onPress={sendOrder}/> <!-- 3 -->
            </SafeAreaView>
        )
    } else { // 1
        return <Text>Der Warenkorb ist leer</Text> // 2
    }

    function less(cartArticle) { // 1
        CartObj.cart.removeArticle(cartArticle.article) // 3
        forceRedraw() // 1
    }

    function more(cartArticle) { // 1
        CartObj.cart.addArticle(cartArticle.article) // 3
        forceRedraw() // 1
    }

    function sendOrder() { // 1
        Alert.alert("Erfolg", "Die Bestellung wurde erfolgreich abgeschickt") // 1
        CartObj.cart.clear() // 2
        setArticles(CartObj.cart.articles) // 3
    }

    function forceRedraw() { // 1
        setFlag(!flag) // 2
    }
}

// 89
