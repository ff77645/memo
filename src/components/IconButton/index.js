import React from "react";
import {
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default function IconButton({
    onPress,
    ...props
}){

    return (
        <TouchableOpacity onPress={onPress}>
            <Icon padding={4} {...props}></Icon>
        </TouchableOpacity>
    )
}