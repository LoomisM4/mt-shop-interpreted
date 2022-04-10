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
                        <Text style={{flex: 1, fontSize: 20}}>{cartArticle.article.name}</Text>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <TouchableHighlight onPress={() => less(cartArticle)}>
                                <Text style={{fontSize: 20, marginRight: 30}}>-</Text>
                            </TouchableHighlight>
                            <Text style={{fontSize: 20}}>{cartArticle.quantity}</Text>
                            <TouchableHighlight onPress={() => more(cartArticle)}>
                                <Text style={{fontSize: 20, marginLeft: 30}}>+</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={{fontSize: 20}}>{cartArticle.getPositionPrice().toFixed(2)}</Text>
                    </View>
                ))}
                <Text style={{fontSize: 20}}>Preis: {CartObj.cart.getTotalPrice().toFixed(2)}</Text>
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
