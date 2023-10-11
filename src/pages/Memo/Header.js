import React from "react";
import {
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './HeaderStyle'




export default function Header(){


    return (
        <View>
            <View style={Styles.headerInner}>
                <View style={Styles.headerInnerLeft}>
                    <View style={Styles.classifyWrap}>
                        <Text style={{fontSize:26,fontWeight:'bold'}}>账号</Text>
                        <Icon name="caret-down" size={20}></Icon>
                    </View>
                    <Text style={{color:"#333"}}>9条记录</Text>
                </View>
                <View style={Styles.headerInnerRight}>
                    <Icon name="ellipsis-vertical" size={20}></Icon>
                </View>
            </View>
        </View>
    )
}
