import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";

export default function Map() { // 1
    const [lat, setLat] = useState(); // 2
    const [long, setLong] = useState(); // 2
    const [loaded, setLoaded] = useState(false); // 2

    useEffect(() => { // 1
        Geolocation.setRNConfiguration({authorizationLevel: "whenInUse"}) // 2
    }, [])

    Geolocation.getCurrentPosition(position => { // 1
        setLat(position.coords.latitude) // 3
        setLong(position.coords.longitude) // 3
        setLoaded(true) // 1
    }, error => console.log(error.message), {enableHighAccuracy: true, timeout: 30000}) // 2

    if (loaded) { // 2
        return ( // 1
            <View style={{flex: 1}}> <!-- 3 -->
                <MapView style={{...StyleSheet.absoluteFillObject}}
                         showsUserLocation={true}
                         initialRegion={{
                            longitude: long, // 1
                            latitude: lat, // 1
                            longitudeDelta: 0.01, // 1
                            latitudeDelta: 0.01 // 1
                }}> <!-- 5 -->
                    <Marker coordinate={{
                        longitude: long - 0.003, // 1
                        latitude: lat + 0.002, // 1
                    }}/> <!-- 2 -->
                </MapView>
            </View>
        )
    } else { // 1
        return <Text>Lade Position</Text> // 2
    }
}

// 42
