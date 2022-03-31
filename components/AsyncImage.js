import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text} from "react-native";
import Api from "../util/Api";

export default function AsyncImage(props) {
    const [img, setImg] = useState()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        Api.image(props.url)
            .then(response => {
                Image.getSize(response, (w, h) => {
                    let windowWidth = Dimensions.get("window").width
                    let ratio;
                    if (props.width === undefined) {
                        setWidth(windowWidth)
                        ratio = windowWidth / w
                    } else {
                        setWidth(windowWidth * props.width)
                        ratio = windowWidth * props.width / w
                    }
                    setHeight(h * ratio)
                }, e => console.log(e));
                setImg(response)
            })
            .catch(() => console.log(Api.error))
    }, [])

    if (img === undefined) {
        return <Text>Laden...</Text>
    } else {
        return <Image source={{uri: img}} style={{width: width, height: height}}/>
    }
}
