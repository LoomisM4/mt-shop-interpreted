import React, {useEffect, useState} from 'react';
import {View, Button, Text, SafeAreaView, TouchableHighlight, Alert} from "react-native";
import CartObj from "../objects/CartObj";

export default function Cart() {
    const [articles, setArticles] = useState(CartObj.cart.articles)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        setArticles(CartObj.cart.articles)
        forceRedraw()
    }, [])

    if (articles.length > 0) {
        return (
            <SafeAreaView>
                {articles.map(cartArticle => (
                    <View key={cartArticle.article.id} style={{flexDirection: "row"}}>
                        <Text style={{flex: 1}}>{cartArticle.article.name}</Text>
                        <TouchableHighlight style={{flex: 1}} onPress={() => less(cartArticle)}>
                            <Text>-</Text>
                        </TouchableHighlight>
                        <Text style={{flex: 1}}>{cartArticle.quantity}</Text>
                        <TouchableHighlight style={{flex: 1}} onPress={() => more(cartArticle)}>
                            <Text>+</Text>
                        </TouchableHighlight>
                        <Text style={{flex: 1}}>{cartArticle.getPositionPrice().toFixed(2)}</Text>
                    </View>
                ))}
                <Text>{CartObj.cart.getTotalPrice().toFixed(2)}</Text>
                <Button title={"Zahlungspflichtig bestellen"} onPress={sendOrder}/>
            </SafeAreaView>
        )
    } else {
        return <Text>Der Warenkorb ist leer</Text>
    }

    function less(cartArticle) {
        CartObj.cart.removeArticle(cartArticle.article)
        forceRedraw()
    }

    function more(cartArticle) {
        CartObj.cart.addArticle(cartArticle.article)
        forceRedraw()
    }

    function sendOrder() {
        Alert.alert("Erfolg", "Die Bestellung wurde erfolgreich abgeschickt")
        CartObj.cart.clear()
        setArticles(CartObj.cart.articles)
    }

    function forceRedraw() {
        setFlag(!flag)
    }
}
