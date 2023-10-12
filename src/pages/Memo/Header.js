import React,{useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './HeaderStyle'




export default function Header(props){
    const handleOption = ()=>{
        console.log(123)
    }
    const clickCategray = ()=>{
        props.onSetShowCategray(!props.showCategray)
    }

    return (
        <View>
            <View style={Styles.headerInner}>
                <View style={Styles.headerInnerLeft}>
                    <TouchableWithoutFeedback onPress={clickCategray}>
                        <View style={Styles.classifyWrap}>
                            <Text style={{
                                fontSize:26,
                                fontWeight:'bold',
                                color:'#000',
                            }}>账号3</Text>
                            {
                                props.showCategray ? 
                                <Icon name="caret-up" size={18} color="#000"></Icon> :
                                <Icon name="caret-down" size={18} color="#000"></Icon>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{color:"#333"}}>9条记录</Text>
                </View>
                <View style={Styles.headerInnerRight}>
                    <TouchableOpacity onPress={handleOption}>
                        {!props.showCategray && <Icon name="ellipsis-vertical" size={20} color="#000"></Icon>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
