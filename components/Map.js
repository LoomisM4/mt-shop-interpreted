import React, {useEffect, useState} from 'react';
import {Text} from "react-native";
import Geolocation from "@react-native-community/geolocation";

export default function Map() {
    const [text, setText] = useState("Laden...")

    useEffect(() => {
        Geolocation.setRNConfiguration({authorizationLevel: "whenInUse"})
    }, [])

    Geolocation.getCurrentPosition(position => {
        console.log(JSON.stringify(position))
        const long = position.coords.longitude
        const lat = position.coords.latitude
        setText("Long: " + long + ", Lat: " + lat)
    }, error => setText(error.message), {enableHighAccuracy: true, timeout: 5000})

    return (
        <Text>{text}</Text>
    )
}
