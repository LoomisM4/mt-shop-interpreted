import React, {useEffect, useState} from 'react';
import {View, Button, Text, SafeAreaView, TouchableHighlight} from "react-native";
import CartObj from "../objects/CartObj";

export default function Cart() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setArticles(CartObj.cart.articles)
    }, [])

    if (articles.length > 0) {
        return (
            <SafeAreaView>
                {articles.map(cartArticle => (
                    <View key={cartArticle.article.articleId} style={{flexDirection: "row"}}>
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
        setArticles(CartObj.cart.articles)
    }

    function more(cartArticle) {
        CartObj.cart.addArticle(cartArticle.article)
        setArticles(CartObj.cart.articles)
    }

    function sendOrder() {
        //alert("Bestellung erfolgreich abgeschickt")
        CartObj.cart.clear()
        setArticles(CartObj.cart.articles)
    }
}
