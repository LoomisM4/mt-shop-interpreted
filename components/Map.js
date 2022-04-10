import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";

export default function Map() {
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Geolocation.setRNConfiguration({authorizationLevel: "whenInUse"})
    }, [])

    Geolocation.getCurrentPosition(position => {
        console.log(JSON.stringify(position))
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        setLoaded(true)
    }, error => console.log(error.message), {enableHighAccuracy: true, timeout: 30000})

    if (loaded) {
        return (
            <View style={{flex: 1}}>
                <MapView style={{...StyleSheet.absoluteFillObject}}
                         showsUserLocation={true}
                         initialRegion={{
                            longitude: long,
                            latitude: lat,
                            longitudeDelta: 0.01,
                            latitudeDelta: 0.01
                }}>
                    <Marker coordinate={{
                        longitude: long - 0.003,
                        latitude: lat + 0.002,
                    }}/>
                </MapView>
            </View>
        )
    } else {
        return <Text>Lade Position</Text>
    }
}
