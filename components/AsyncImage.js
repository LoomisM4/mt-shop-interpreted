import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text} from "react-native";
import Api from "../util/Api";

export default function AsyncImage(props) { // 1
    const [img, setImg] = useState() // 2
    const [width, setWidth] = useState(0) // 2
    const [height, setHeight] = useState(0) // 2

    useEffect(() => { // 1
        Api.image(props.url) // 2
            .then(response => { // 1
                Image.getSize(response, (w, h) => { // 1
                    let windowWidth = Dimensions.get("window").width // 3
                    let ratio; // 0
                    if (props.width === undefined) { // 3
                        setWidth(windowWidth) // 1
                        ratio = windowWidth / w // 2
                    } else { // 1
                        setWidth(windowWidth * props.width) // 3
                        ratio = windowWidth * props.width / w // 3
                    }
                    setHeight(h * ratio) // 2
                }, e => console.log(e)); // 0
                setImg(response) // 1
            })
    }, [])

    if (img === undefined) { // 2
        return <Text>Laden...</Text> // 2
    } else { // 1
        return <Image source={{uri: img}} style={{width: width, height: height}}/> // 7
    }
}

// 43
